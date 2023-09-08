import Ajv from 'ajv';
import { MyError } from '../../../../../../Shared/Classes/error';
import { schema } from './scima';

export interface iParams {
    id: number;
    params: { [key: string]: number | string | boolean };
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data = params as iParams;

    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (valid) {
        return data;
    } else {
        throw new MyError(400, 'bad request', validate.errors);
    }
};
