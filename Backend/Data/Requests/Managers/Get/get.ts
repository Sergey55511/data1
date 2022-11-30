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
            ManagerOperations: { some: { Operation: { id: data.operationId } } },
        },
        orderBy: { name: 'asc' },
    }) as any;
};
