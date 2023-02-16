import Ajv from 'ajv';
import moment from 'moment';
import { MyError } from '../../../../../../Shared/Classes/error';
import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    start: string;
    end: string;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        start: params.start
            ? moment(params.start.replaceAll('"', '')).format('YYYY-MM-DD')
            : '',
        end: params.start
            ? moment(params.end.replaceAll('"', '')).format('YYYY-MM-DD')
            : '',
    };
    return checkSchema(data, schema);
};
