import { PrismaPromise } from '@prisma/client';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import type { NextApiRequest } from 'next';
import { sql } from './prepareSQL';
import { extructParams } from './extructParams';

export const getData = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): PrismaPromise<T> => {
    const { storeId, pp } = extructParams({ req, user });
    return prisma.$queryRawUnsafe(sql, storeId, pp);
};
