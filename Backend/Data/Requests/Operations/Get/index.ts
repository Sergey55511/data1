import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const getOperations = <T>(prisma: tPrisma, params: any): PrismaPromise<T> => {
    const data = dal(params);

    return prisma.operations.findMany({
        select: { id: true, operation: true },
        where: {
            AND: {
                StateOperationBridge: { some: { stateId: data.stateId } },
                StoreOperationsBridge: { some: { storeId: data.storeId } },
                ManagerOperations: { some: { managerId: data.managerId } },
            },
        },
        orderBy: { operation: 'asc' },
    }) as any;
};
