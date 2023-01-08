import { iDataProductTable } from '../../../../../../Shared/Types/interfaces';
import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    storeId: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        storeId: +params.storeId,
    };

    return checkSchema(data, schema);
};
