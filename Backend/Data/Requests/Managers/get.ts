import { PrismaClient } from '@prisma/client';

export const getManagers = <T>(storeId: number, operationId: number): Promise<T> => {
    const prisma = new PrismaClient();
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
