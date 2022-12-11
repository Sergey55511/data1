import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getLengthModel = <T>(prisma: tPrisma): PrismaPromise<T> => {
    return prisma.lengthModel.findMany({
        select: {
            id: true,
            length: true,
        },
        where: { active: true, FullModels: { some: { active: true } } },
        orderBy: { length: 'asc' },
    }) as any;
};
