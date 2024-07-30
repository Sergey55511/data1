import { NextApiRequest } from 'next';
import { iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';
import { prepareDate } from './prepareDate';
import { prepareSql } from './prepareSql';

export const getLeftoversAssemble = (
    prisma: tPrisma,
    user: iUser,
    req: NextApiRequest,
) => {
    const { stateFilter, queryParams, workpieceTypeIdFilter } = prepareDate(user, req);
    const sql = prepareSql(stateFilter, workpieceTypeIdFilter);
    return prisma.$queryRawUnsafe(sql, ...queryParams) as any;
};
