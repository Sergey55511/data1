import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getOperations = <T>(storeId: number, stateId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.operations.findMany({
        select: { id: true, operation: true },
        where: {
            AND: {
                StateOperationBridge: { some: { stateId } },
                StoreOperationsBridge: { some: { storeId } },
            },
        },
        orderBy: { operation: 'asc' },
    }) as any;
};
