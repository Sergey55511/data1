import { iDataProductTable } from '../../../../../../Shared/Types/interfaces';
import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams extends iDataProductTable {}

export const dal = (params: { [key: string]: any }): iParams => {
    const getNumber = (v: any) => (v ? +v : undefined);
    const data: iParams = {
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
    };

    return checkSchema(data, schema);
};
