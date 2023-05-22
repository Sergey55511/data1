import { checkSchema } from '../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    workpieceTypeId?: number;
    sizeRangeId?: number;
    colorId?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const getNumber = (v: any) => (v ? +v : undefined);
    const data: iParams = {
        workpieceTypeId: getNumber(params.workpieceTypeId),
        sizeRangeId: getNumber(params.sizeRangeId),
        colorId: getNumber(params.colorId),
    };
    return checkSchema(data, schema);
};
