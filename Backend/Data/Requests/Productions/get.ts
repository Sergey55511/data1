import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getProductions = <T>(prisma: tPrisma,storeId: number): PrismaPromise<T> => {

    return prisma.productions.findMany({
        select: {
            id: true,
            description: true,
        },
        where: { storeId: +storeId },
        orderBy: { id: 'desc' },
    }) as any;
};
