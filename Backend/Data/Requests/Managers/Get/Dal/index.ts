import Ajv from 'ajv';
import { MyError } from '../../../../../../Shared/Classes/error';
import { schema } from './scima';

export interface iParams {
    storeId: number;
    operationId?: number;
    search?: string;
    active?: boolean;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        storeId: +params.storeId,
        operationId: params.operationId ? +params.operationId : params.operationId,
        search: params.search ? params.search : params.search,
        active: params.active ? params.active == 'true' : params.active,
    };

    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
        return data;
    } else {
        throw new MyError(400, 'bad request', validate.errors);
    }
};
