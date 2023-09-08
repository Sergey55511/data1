import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    id?: number;
    workpieceTypeId?: number;
    profileId?: number;
    sizeRangeModelId?: number;
    modelId?: number;
    size?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const getValue = (v: any) => (v ? +v : undefined);
    const data: iParams = {
        id: getValue(params.id),
        workpieceTypeId: getValue(params.workpieceTypeId),
        profileId: getValue(params.profileId),
        sizeRangeModelId: getValue(params.sizeRangeModelId),
        modelId: getValue(params.modelId),
        size: getValue(params.size),
    };

    return checkSchema(data, schema);
};
