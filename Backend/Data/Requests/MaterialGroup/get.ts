import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getMaterialGroup = <T>(prisma: tPrisma): PrismaPromise<T> => {

    return prisma.materialGroup.findMany({
        select: { id: true, materialGroup: true },
        where: { active: true },
        orderBy: { position: 'asc' },
    }) as any;
};
