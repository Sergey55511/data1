import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getOperations = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.storeOperations
        .findFirst({
            select: {
                Opereytion: { select: { id: true, opereytion: true } },
            },
            where: { storeId: +storeId },
        })
        .then((data) => data?.Opereytion) as any;
};
