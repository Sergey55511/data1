import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const getManagers = <T>(prisma: tPrisma, params: any): Promise<T> => {
    const data = dal(params);

    return prisma.managers.findMany({
        select: {
            id: true,
            name: true,
            active: true,
        },
        where: {
            active: data.active,
            storeId: data.storeId,
            name: { contains: data.search, mode: 'insensitive' },
            ManagerOperations: data.operationId
                ? { some: { Operation: { id: data.operationId } } }
                : undefined,
        },
        orderBy: { name: 'asc' },
    }) as any;
};
