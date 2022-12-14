import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    workpieceTypeId: number;
    profileId: number;
    sizeRangeModelId: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        workpieceTypeId: +params.workpieceTypeId,
        profileId: +params.profileId,
        sizeRangeModelId: +params.sizeRangeModelId,
    };

    return checkSchema(data, schema);
};
