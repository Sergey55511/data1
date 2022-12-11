import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getSizeRangeModel = <T>(prisma: tPrisma): PrismaPromise<T> => {
    return prisma.sizeRangeModel.findMany({
        select: {
            id: true,
            sizeRange: true,
        },
        where: { active: true, FullModels: { some: { active: true } } },
        orderBy: { sizeRange: 'asc' },
    }) as any;
};
