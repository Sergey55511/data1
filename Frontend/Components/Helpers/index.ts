import { notification } from 'antd';
import { NextRouter } from 'next/router';
import { WORKPIECETYPE } from '../../../Shared/constants';
import { iData, iDataTable, iField } from '../../../Shared/Types/interfaces';
import { tValue } from '../Shared/InputNumber';

export const getLosseObject = (
    record: iData,
    workpieceTypeId: number,
    losses: number,
) => ({
    ...record,
    workpieceTypeId,
    stateId: undefined,
    modelId: undefined,
    fractionId: undefined,
    materialGroupId: undefined,
    colorId: undefined,
    length: undefined,
    channelId: undefined,
    gradeId: undefined,
    widthOut: undefined,
    widthIn: +losses.toFixed(2),
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
        return (res += +item.widthIn.value || 0);
    }, 0);

export const sendData = async ({
    record,
    data,
    losses,
    garbage,
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
    defect?: tValue;
    moveBack?: tValue;
    setIsLoading: (flag: boolean) => void;
    router: NextRouter;
    postOrderResult: (
        data: iDataTable[],
        callBack?: (() => void) | undefined,
    ) => Promise<void>;
}) => {
    if (losses) {
        data.push(getLosseObject(record, WORKPIECETYPE.losses.id, +losses));
    }

    if (defect) {
        data.push(getLosseObject(record, WORKPIECETYPE.defect.id, +defect));
    }
    if (garbage) {
        data.push(getLosseObject(record, WORKPIECETYPE.garbage.id, +garbage));
    }

    if (moveBack) {
        const moveBackMoney = getMoveBackMoney(
            record.code,
            record.width,
            moveBack ? +moveBack : undefined,
        );
        data.push({
            ...record,
            widthOut: +moveBack * -1,
            moneyOut: moveBackMoney,
        });
    }

    const dataTable = data.map((item) => prepareDataTable(item));
    setIsLoading(true);
    await postOrderResult(dataTable);
    notification.success({
        message: 'Сохранение прошло успешно',
    });
    router.push('/orders');
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
        'numProduction',
        'pp',
        'typeId',
        'workpieceTypeId',
        'numDocument',
        'userId',
        'managerId',
        'modelId',
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
        'countItemsOut',
        'widthOut',
        'widthIn',
        'date',
        'moneyIn',
        'moneyOut',
    ];
    const result: iDataTable = {};
    Object.keys(data).forEach((key) => {
        const keyDt = key as keyof iDataTable;
        if (dataTableKeys.includes(key)) result[keyDt] = data[keyDt];
    });
    return result;
};
