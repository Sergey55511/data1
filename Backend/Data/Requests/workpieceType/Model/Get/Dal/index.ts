import { checkSchema } from '../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    operationId: number;
    isminaletgroup?: boolean;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        operationId: +params.operationId,
        isminaletgroup: params.isMinaletGroup ? true : undefined,
    };

    return checkSchema(data, schema);
};
