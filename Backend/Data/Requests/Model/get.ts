import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getModel = <T>(prisma: tPrisma): PrismaPromise<T> => {
    return prisma.models.findMany({
        select: {
            id: true,
            model: true,
        },
        where: { active: true, FullModels: { some: { active: true } } },
        orderBy: { model: 'asc' },
    }) as any;
};
