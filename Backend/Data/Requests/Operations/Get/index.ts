import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const getOperations = <T>(prisma: tPrisma, params: any): PrismaPromise<T> => {
    const data = dal(params);

    return prisma.operations.findMany({
        select: { id: true, operation: true },
        where: {
            AND: {
                StateOperationBridge: data.stateId
                    ? { some: { stateId: data.stateId } }
                    : undefined,
                StoreOperationsBridge: { some: { storeId: data.storeId } },
                ManagerOperations: data.managerId
                    ? {
                          some: {
                              managerId: data.managerId,
                              active: data.managerOperationsActive,
                          },
                      }
                    : undefined,
            },
        },
        orderBy: { operation: 'asc' },
    }) as any;
};
