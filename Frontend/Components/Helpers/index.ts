import { notification } from 'antd';
import { NextRouter } from 'next/router';
import { WORKPIECETYPE } from '../../../Shared/constants';
import { iData, iDataTable, iField } from '../../../Shared/Types/interfaces';
import { ROUTES } from '../Pages/constants';
import { tValue } from '../Shared/InputNumber';
import divide from 'lodash/divide';

export const getCode = (
    code?: number,
    width?: number,
    moveBack?: number,
    prune?: number,
) => {
    const getValue = (v: any) => (v ? +v : 0);
    const codePoint = divide(getValue(code), getValue(width));
    const productWidth = getValue(width) * -1 - getValue(moveBack) - getValue(prune);
    return productWidth * codePoint;
};

export const getPruneObject = (
    record: iData,
    workpieceTypeId: number,
    losses: number,
    code?: number,
    stateId?: number,
): iData => ({
    ...record,
    workpieceTypeId,
    fractionId: undefined,
    materialGroupId: undefined,
    stateId,
    colorId: undefined,
    fullModelId: undefined,
    task: undefined,
    lengthId: undefined,
    channelId: undefined,
    gradeId: undefined,
    widthOut: undefined,
    widthIn: +losses.toFixed(2),
    moneyIn: code ? code : undefined,
});

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
    sizeRangeId: undefined,
    fullModelId: undefined,
    task: undefined,
    lengthId: undefined,
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

export const getCodeOneItem = ({
    recordCode,
    recordWidth,
    totalSum,
    moveBack,
    pruning,
}: {
    recordCode?: number;
    recordWidth?: number;
    moveBack?: tValue;
    pruning?: tValue;
    totalSum: number;
}) => {
    const getNumber = (value: any) => (value ? +value : 0);
    const absRecordWidth = Math.abs(getNumber(recordWidth));
    let code = getNumber(recordCode);
    code = code < 0 ? code * -1 : code;
    const width = getNumber(absRecordWidth) - getNumber(moveBack) - getNumber(pruning);
    let codeOneItem = absRecordWidth ? code / absRecordWidth : 0;
    const codeRest = codeOneItem * width;
    return recordWidth ? codeRest / totalSum : 0;
};

export const prepareSubbmitData = ({
    record,
    data,
    losses,
    garbage,
    pruning,
    defect,
    moveBack,
    stateId,
}: {
    record: iData;
    data: iData[];
    losses?: tValue;
    garbage?: tValue;
    pruning?: tValue;
    defect?: tValue;
    moveBack?: tValue;
    stateId?: number;
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
        codePrun = codePrun * +pruning * -1;
        data.push(
            getPruneObject(record, WORKPIECETYPE.prunes.id, +pruning, codePrun, stateId),
        );
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
    stateId,
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
    stateId?: number;
}) => {
    const dataTable = prepareSubbmitData({
        record,
        data,
        losses,
        garbage,
        defect,
        moveBack,
        pruning,
        stateId,
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
        'workingTimeFact',
        'workingTimePlan',
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

export const checkDuplicate = (state: any[]): any[] => {
    let rows = state.map((item, index) => {
        const keys = Object.keys(item);
        const k = keys.filter((key) => item[key]?.checkDuplicate);
        const values = k.map((key) => item[key].value);
        const itemString = JSON.stringify(values);

        return { index, itemString, count: 0 };
    });

    rows.forEach((item) => {
        const find = rows.filter((itm) => itm.itemString == item.itemString);
        if (!find[0].count) {
            const count = find.length;
            find.forEach((itm) => (itm.count = count));
        }
    });

    return state.map((item, index) => {
        if (rows[index].count > 1) {
            item.duplicate = true;
        } else {
            item.duplicate = false;
        }
        return { ...item };
    });
};

export const getCounterDataHandler = (data: any[]) =>
    data.map((item) => ({
        widthIn: item.widthIn.value,
        countItemsIn: item.countItemsIn?.value,
    }));
