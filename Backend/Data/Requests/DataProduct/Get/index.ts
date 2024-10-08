import { NextApiRequest } from 'next';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { prepareParams } from './prepareParams';
import { prepareSQL } from './prepareSQL';

export const getDataProduct = async <T>(
    prisma: tPrisma,
    user: iUser,
    req: NextApiRequest,
): Promise<T> => {
    const { params, articleId } = prepareParams({ user, req });

    const sql = prepareSQL(articleId);

    return (await prisma.$queryRawUnsafe(sql, ...params)) as any;
};
