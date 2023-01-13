import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

type iParams = {
    managerId: number;
    articles: number[];
};

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        managerId: params.managerId ? +params.managerId : params.managerId,
        articles: params.articles,
    };
    console.log('data', data);

    return checkSchema(data, schema);
};
