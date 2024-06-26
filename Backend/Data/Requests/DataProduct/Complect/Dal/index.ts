import {
    iData,
    iDataProduct,
    iDataProductTable,
    iDataTable,
} from '../../../../../../Shared/Types/interfaces';
import { checkSchema } from '../../../../../Helpers/checkSchema';
import { getData } from './getData';
import { getProduct } from './getProduct';
import { schema } from './scima';

export interface iParams<
    T extends iDataProduct | iDataProductTable,
    T2 extends iData | iDataTable,
> {
    complect: T;
    minaret: T2;
    model: string;
    length: number;
    width: number;
}

export const dal = (
    params: iParams<iDataProduct, iData>,
): iParams<iDataProductTable, iDataTable> => {
    const data: iParams<iDataProductTable, iDataTable> = {
        complect: getProduct(params.complect),
        minaret: getData(params.minaret),
        model: params.model,
        length: +params.length,
        width: +params.width,
    };

    return checkSchema(data, schema);
};
