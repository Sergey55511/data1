import { checkSchema } from '../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    id: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        id: +params.id,
    };
    return checkSchema(data, schema);
};
