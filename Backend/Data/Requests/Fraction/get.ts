import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getFraction = <T>(prisma: tPrisma): PrismaPromise<T> => {
    return prisma.fraction.findMany({
        select: { id: true, fraction: true },
        where: { active: true },
        orderBy: { position: 'asc' },
    }) as any;
};
