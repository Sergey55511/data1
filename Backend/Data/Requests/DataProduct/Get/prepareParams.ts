import { NextApiRequest } from 'next';
import { iUser } from '../../../../../Shared/Types/interfaces';

export const prepareParams = ({ user, req }: { user: iUser; req: NextApiRequest }) => {
    const articleId = req.query.articleId;
    const articleIdPrepared = articleId ? +articleId : 0;
    const params = [user.storeId, articleIdPrepared];
    return { params, articleId: articleIdPrepared };
};
