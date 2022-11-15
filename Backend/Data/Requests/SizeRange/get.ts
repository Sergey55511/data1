import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getSizeRange = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    const params = getFilters(req.query);
    return prisma.sizeRange.findMany({
        select: { id: true, sizeRange: true, size: true },
        where: { active: true, Bridge: { some: params } },
        orderBy: { size: 'desc' },
    }) as any;
};
