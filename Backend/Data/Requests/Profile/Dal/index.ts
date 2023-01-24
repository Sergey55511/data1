import { checkSchema } from '../../../../Helpers/checkSchema';
import { prepareNumber } from '../../Data/Dal';
import { schema } from './scima';

export interface iParams {
    workpieceTypeId?: number;
    sizeRangeModelId?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        workpieceTypeId: prepareNumber(params.workpieceTypeId),
        sizeRangeModelId: prepareNumber(params.sizeRangeModelId),
    };

    return checkSchema(data, schema);
};
