import { iData, iDataTable } from '../../../../../../Shared/Types/interfaces';

const getNumber = (v: any) => (v ? +v : undefined);

export const getData = (params: iData[]): iDataTable[] => {
    return params.map((item) => ({
        managerId: getNumber(item?.managerId),
        articleId: getNumber(item?.articleId),
        channelId: getNumber(item?.channelId),
        moneyOut: getNumber(item?.moneyOut),
        colorId: getNumber(item?.colorId),
        countItemsOut: getNumber(item?.countItemsOut),
        fullModelId: getNumber(item?.fullModelId),
        gradeId: getNumber(item?.gradeId),
        lengthId: getNumber(item?.lengthId),
        lot: getNumber(item?.lot),
        productionId: getNumber(item?.productionId),
        sizeRangeId: getNumber(item?.sizeRangeId),
        stateId: getNumber(item?.stateId),
        typeId: getNumber(item?.typeId),
        widthOut: getNumber(item?.widthOut),
        workpieceTypeId: getNumber(item?.workpieceTypeId),
    }));
};
