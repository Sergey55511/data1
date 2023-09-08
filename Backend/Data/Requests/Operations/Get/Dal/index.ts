import Ajv from 'ajv';
import { MyError } from '../../../../../../Shared/Classes/error';
import { schema } from './scima';

export interface iParams {
    storeId: number;
    stateId?: number;
    managerId?: number;
    managerOperationsActive?: boolean;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        storeId: +params.storeId,
        stateId: params.stateId ? +params.stateId : undefined,
        managerId: params.managerId ? +params.managerId : undefined,
        managerOperationsActive:
            params.managerOperationsActive == 'true' ? true : undefined,
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
