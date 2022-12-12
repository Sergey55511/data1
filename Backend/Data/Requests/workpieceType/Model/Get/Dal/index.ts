import { checkSchema } from '../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    operationId: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        operationId: +params.operationId,
    };

    return checkSchema(data, schema);
};
