import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getSizeRange = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    const params = getFilters(req.query);
    const id = req.query.id ? +req.query.id : undefined;
    return prisma.sizeRange.findMany({
        select: { id: true, sizeRange: true, size: true },
        where: { active: true, id, Bridge: { some: params } },
        orderBy: { size: 'asc' },
    }) as any;
};
