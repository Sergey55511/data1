import { iDataProductTable } from '../../../../../../Shared/Types/interfaces';
import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

type tResult = number[];

export const dal = (params: tResult): tResult => {
    return checkSchema(params, schema);
};
