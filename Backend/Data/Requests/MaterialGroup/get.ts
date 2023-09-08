import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';
import type { NextApiRequest } from 'next';
import { dal } from './Dal';

export const getMaterialGroup = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    const data = dal(req.query);

    return prisma.materialGroup.findMany({
        select: { id: true, materialGroup: true },
        where: { active: true, forSorting: data.forSorting },
        orderBy: { position: 'asc' },
    }) as any;
};
