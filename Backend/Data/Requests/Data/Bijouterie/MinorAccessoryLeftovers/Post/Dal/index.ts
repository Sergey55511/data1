import { checkSchema } from '../../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    idAccessory: number;
    countIn?: number;
    countOut?: number;
    moneyIn?: number;
    moneyOut?: number;
    pp?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const getNumber = (v: any) => (v ? +v : undefined);

    const data: iParams = {
        idAccessory: +params.idAccessory,
        countIn: getNumber(params.countIn),
        countOut: getNumber(params.countOut),
        moneyIn: getNumber(params.moneyIn),
        moneyOut: getNumber(params.moneyOut),
        pp: getNumber(params.countOut),
    };
    return checkSchema(data, schema);
};
