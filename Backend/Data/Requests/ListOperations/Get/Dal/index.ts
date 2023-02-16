import Ajv from 'ajv';
import { MyError } from '../../../../../../Shared/Classes/error';
import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    month: number;
    year: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        month: +params.month,
        year: +params.year,
    };
    return checkSchema(data, schema);
};
