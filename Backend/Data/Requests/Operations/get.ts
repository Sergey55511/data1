import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getOperations = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.storeOperations
        .findFirst({
            select: {
                Operation: { select: { id: true, operation: true } },
            },
            where: { storeId: +storeId },
        })
        .then((data) => data?.Operation) as any;
};
