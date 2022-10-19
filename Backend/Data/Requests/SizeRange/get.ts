import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getSizeRange = <T>(prisma: tPrisma): PrismaPromise<T> => {
    return prisma.sizeRange.findMany({
        select: { id: true, sizeRange: true },
        where: { active: true },
        orderBy: { position: 'asc' },
    }) as any;
};
