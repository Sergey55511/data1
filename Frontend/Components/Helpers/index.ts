import { notification } from 'antd';
import { NextRouter } from 'next/router';
import { WORKPIECETYPE } from '../../../Shared/constants';
import { iData, iDataTable, iField } from '../../../Shared/Types/interfaces';
import { ROUTES } from '../Pages/constants';
import { tValue } from '../Shared/InputNumber';

export const getLosseObject = (
    record: iData,
    workpieceTypeId: number,
    losses: number,
    code?: number,
): iData => ({
    ...record,
    workpieceTypeId,
    stateId: undefined,
    fractionId: undefined,
    materialGroupId: undefined,
    colorId: undefined,
    length: undefined,
    channelId: undefined,
    gradeId: undefined,
    widthOut: undefined,
    widthIn: +losses.toFixed(2),
    moneyIn: code ? code : undefined,
});

export const getMoveBackMoney = (
    code: number | undefined,
    width: number | undefined,
    moveBack: number | undefined,
) => {
    const newCode = code || 0;
    const moveBackMoneyOne = newCode / (width || newCode);
    return (moveBack || 0) * moveBackMoneyOne * -1;
};

export const getTotalSum = <T extends { widthIn: { value: string | number } }>(
    state: T[],
) =>
    state.reduce((res, item) => {
        if (!item) return res;
        return (res += +item.widthIn?.value || 0);
    }, 0);

export const prepareSubbmitData = ({
    record,
    data,
    losses,
    garbage,
    pruning,
    defect,
    moveBack,
}: {
    record: iData;
    data: iData[];
    losses?: tValue;
    garbage?: tValue;
    pruning?: tValue;
    defect?: tValue;
    moveBack?: tValue;
}) => {
    const recordDate = { ...record, date: data[0].date };
    if (losses) {
        data.push(getLosseObject(recordDate, WORKPIECETYPE.losses.id, +losses));
    }

    if (defect) {
        data.push(getLosseObject(recordDate, WORKPIECETYPE.defect.id, +defect));
    }
    if (garbage) {
        data.push(getLosseObject(recordDate, WORKPIECETYPE.garbage.id, +garbage));
    }
    if (pruning) {
        let codePrun = record.widthOut ? (record.code || 0) / record.widthOut : 0;
        codePrun = codePrun * +pruning;
        data.push(getLosseObject(recordDate, WORKPIECETYPE.prunes.id, +pruning, codePrun));
    }

    if (moveBack) {
        const moveBackMoney = getMoveBackMoney(
            record.code,
            record.width,
            moveBack ? +moveBack : undefined,
        );
        data.push({
            ...recordDate,
            widthOut: +moveBack * -1,
            moneyOut: moveBackMoney,
        });
    }

    const dataTable = data.map((item) => prepareDataTable(item));

    return dataTable;
};

export const sendData = async ({
    record,
    data,
    losses,
    garbage,
    pruning,
    defect,
    moveBack,
    setIsLoading,
    router,
    postOrderResult,
}: {
    record: iData;
    data: iData[];
    losses?: tValue;
    garbage?: tValue;
    pruning?: tValue;
    defect?: tValue;
    moveBack?: tValue;
    setIsLoading: (flag: boolean) => void;
    router: NextRouter;
    postOrderResult: (
        data: iDataTable[],
        callBack?: (() => void) | undefined,
    ) => Promise<void>;
}) => {
    const dataTable = prepareSubbmitData({
        record,
        data,
        losses,
        garbage,
        defect,
        moveBack,
        pruning,
    });
    setIsLoading(true);
    await postOrderResult(dataTable);
    notification.success({
        message: 'Сохранение прошло успешно',
    });
    router.push(ROUTES.orders);
    setIsLoading(false);
};

export const validation = (setState: (value: any) => void) => {
    let isError = false;
    setState((prev: any[]) => {
        const res = prev.map((item) => {
            for (const key in item) {
                const obj = item[key] as iField;
                if (obj.isReqired) {
                    if (!item[key].value) {
                        isError = true;
                        item[key].isError = true;
                    } else item[key].isError = false;
                }
            }
            return { ...item };
        });
        return res;
    });
    return isError;
};

export const prepareDataTable = (data: iData): iDataTable => {
    const dataTableKeys = [
        'lot',
        'date',
        'numProduction',
        'workingHours',
        'pp',
        'articleId',
        'typeId',
        'workpieceTypeId',
        'numDocument',
        'userId',
        'managerId',
        'fullModelId',
        'task',
        'recipientId',
        'sizeRangeId',
        'fractionId',
        'materialGroupId',
        'colorId',
        'lengthId',
        'channelId',
        'gradeId',
        'stateId',
        'storeId',
        'productionId',
        'operationId',
        'countItemsIn',
        'countItemsOut',
        'widthOut',
        'widthIn',
        'date',
        'moneyIn',
        'moneyOut',
        'model',
    ];
    const result: iDataTable = {};
    Object.keys(data).forEach((key) => {
        const keyDt = key as keyof iDataTable;
        if (dataTableKeys.includes(key)) result[keyDt] = data[keyDt];
    });
    return result;
};
