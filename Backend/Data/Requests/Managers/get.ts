import { tPrisma } from '../../../types';

export const getManagers = <T>(
    prisma: tPrisma,
    storeId: number,
    operationId: number,
): Promise<T> => {
    return prisma.managers.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            active: true,
            storeId,
            ManagerOperations: { some: { Operation: { id: operationId } } },
        },
        orderBy: { name: 'asc' },
    }) as any;
};
