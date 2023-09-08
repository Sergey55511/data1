import { checkSchema } from '../../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    bijouterieArticleId: number;
    widthIn?: number;
    widthOut?: number;
    moneyIn?: number;
    moneyOut?: number;
    countItemsIn?: number;
    countItemsOut?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const getNumber = (v: any) => (v ? +v : undefined);
    const data: iParams = {
        bijouterieArticleId: params.bijouterieArticleId,
        widthIn: getNumber(params.widthIn),
        widthOut: getNumber(params.widthOut),
        moneyIn: getNumber(params.moneyIn),
        moneyOut: getNumber(params.moneyOut),
        countItemsIn: getNumber(params.countItemsIn),
        countItemsOut: getNumber(params.countItemsOut),
    };
    return checkSchema(data, schema);
};
