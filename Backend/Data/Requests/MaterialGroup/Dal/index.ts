import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    forSorting: boolean;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        forSorting: !!params.forSorting,
    };
    return checkSchema(data, schema);
};
