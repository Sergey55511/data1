import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    workpieceTypeId: number;
    profileId?: number;
    size?: number;
    modelId?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        workpieceTypeId: +params.workpieceTypeId,
        profileId: params.profileId ? +params.profileId : undefined,
        size: params.size ? +params.size : undefined,
        modelId: params.modelId ? +params.modelId : undefined,
    };

    return checkSchema(data, schema);
};