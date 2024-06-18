import { iData, iDataTable } from '../../../../../../Shared/Types/interfaces';

const getNumber = (v: any) => (v ? +v : undefined);

export const getData = (params: iData): iDataTable => {
    return {
        channelId: getNumber(params?.channelId),
        moneyOut: getNumber(params?.code),
        colorId: getNumber(params?.colorId),
        countItemsOut: getNumber(params?.count),
        fullModelId: getNumber(params?.fullModelId),
        gradeId: getNumber(params?.gradeId),
        lengthId: getNumber(params?.lengthId),
        lot: getNumber(params?.lot),
        productionId: getNumber(params?.productionId),
        sizeRangeId: getNumber(params?.sizeRangeId),
        stateId: getNumber(params?.stateId),
        typeId: getNumber(params?.typeId),
        widthOut: getNumber(params?.width),
        workpieceTypeId: getNumber(params?.workpieceTypeId),
    };
};
