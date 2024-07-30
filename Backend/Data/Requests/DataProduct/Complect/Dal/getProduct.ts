import {
    iDataProduct,
    iDataProductTable,
} from '../../../../../../Shared/Types/interfaces';

const getNumber = (v: any) => (v ? +v : undefined);

export const getProduct = (params: iDataProduct): iDataProductTable => {
    return {
        date: params.date,
        storeId: getNumber(params.storeId),
        pp: getNumber(params.pp),
        model: params.model,
        userId: getNumber(params.userId),
        managerId: getNumber(params.managerId),
        workpieceTypeId: getNumber(params.workpieceTypeId),
        colorId: getNumber(params.colorId),
        length: getNumber(params.length),
        gradeId: getNumber(params.gradeId),
        stateId: getNumber(params.stateId),
        articleId: getNumber(params.articleId),
        recipientId: getNumber(params.recipientId),
        operationId: getNumber(params.operationId),
        numDocument: params.numDocument,
        widthIn: getNumber(params.widthIn),
        widthOut: getNumber(params.widthOut),
        moneyIn: getNumber(params.moneyIn),
        moneyOut: getNumber(params.moneyOut),
        countItemsIn: getNumber(params.countItemsIn),
        countItemsOut: getNumber(params.countItemsOut),
        typeAssembleId: getNumber(params.typeAssembleId),
        fullModelId: getNumber(params.fullModelId),
    };
};
