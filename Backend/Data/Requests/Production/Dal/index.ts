import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    productionId: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    console.log('params', params);

    const data: iParams = {
        productionId: +params.productionId,
    };

    return checkSchema(data, schema);
};
