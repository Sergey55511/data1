import { checkSchema } from '../../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    idAccessory: number;
    countIn?: number;
    countOut?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const getNumber = (v: any) => (v ? +v : undefined);

    const data: iParams = {
        idAccessory: +params.idAccessory,
        countIn: getNumber(params.countIn),
        countOut: getNumber(params.countOut),
    };
    return checkSchema(data, schema);
};
