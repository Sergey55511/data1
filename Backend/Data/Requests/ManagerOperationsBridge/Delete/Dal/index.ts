import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    managerId: number;
    operationId: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        managerId: +params.managerId,
        operationId: +params.operationId,
    };

    return checkSchema(data, schema);
};
