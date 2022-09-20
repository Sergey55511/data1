import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getProductions = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.productions.findMany({
        select: {
            id: true,
            description: true,
        },
        where: { storeId: +storeId },
        orderBy: { id: 'desc' },
    }) as any;
};
