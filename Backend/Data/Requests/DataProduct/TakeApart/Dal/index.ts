import { iDataProductTable } from '../../../../../../Shared/Types/interfaces';
import { checkSchema } from '../../../../../Helpers/checkSchema';
import { schema } from './scima';

type iParams = {
    userId: number;
    recipientId: number;
    numDocument: string;
    articles: number[];
};

export const dal = (params: { [key: string]: any }): iParams => {
    const data: iParams = {
        userId: params.userId ? +params.userId : params.userId,
        recipientId: params.recipientId ? +params.recipientId : params.recipientId,
        numDocument: params.numDocument ? params.numDocument : params.numDocument,
        articles: params.number,
    };
    return checkSchema(data, schema);
};
