import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    workpieceTypeId: number;
    profileId: number;
    size: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        workpieceTypeId: +params.workpieceTypeId,
        profileId: +params.profileId,
        size: +params.size,
    };

    return checkSchema(data, schema);
};
