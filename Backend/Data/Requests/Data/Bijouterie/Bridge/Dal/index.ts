import { checkSchema } from '../../../../../../Helpers/checkSchema';
import { schema } from './scima';

export interface iParams {
    articleId: number;
}

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        articleId: +params.articleId,
    };
    return checkSchema(data, schema);
};
