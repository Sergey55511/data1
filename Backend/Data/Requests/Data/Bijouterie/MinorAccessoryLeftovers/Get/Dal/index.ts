import { checkSchema } from '../../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    idAccessory: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        idAccessory: +params.idAccessory,
    };
    return checkSchema(data, schema);
};
