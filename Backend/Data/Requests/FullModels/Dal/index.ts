import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    workpieceTypeId?: number;
    profileId?: number;
    sizeRangeModelId?: number;
    modelId?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        workpieceTypeId: params.workpieceTypeId ? +params.workpieceTypeId : undefined,
        profileId: params.profileId ? +params.profileId : undefined,
        sizeRangeModelId: params.sizeRangeModelId ? +params.sizeRangeModelId : undefined,
        modelId: params.modelId ? +params.modelId : undefined,
    };

    return checkSchema(data, schema);
};
