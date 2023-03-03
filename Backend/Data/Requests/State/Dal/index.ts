import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    stateId?: number[];
    workpieceTypeId?: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const getValue = (v: any) => (v ? +v : undefined);
    const data: iParams = {
        stateId: params['stateId[]']?.map((item: string) => +item),
        workpieceTypeId: getValue(params.workpieceTypeId),
    };

    return checkSchema(data, schema);
};
