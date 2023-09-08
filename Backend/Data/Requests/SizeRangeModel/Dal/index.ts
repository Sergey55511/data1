import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    workpieceTypeId?: number;
    profileId?: number;
    size?: number;
    modelId?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const getValue = (v: any) => (v ? +v : undefined);
    const data: iParams = {
        workpieceTypeId: getValue(params.workpieceTypeId),
        profileId: getValue(params.profileId),
        size: getValue(params.size),
        modelId: getValue(params.modelId),
    };

    return checkSchema(data, schema);
};
