import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getOperations = <T>(prisma: tPrisma,storeId: number, stateId: number): PrismaPromise<T> => {

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
