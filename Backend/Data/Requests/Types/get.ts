import { tPrisma } from '../../../types';

export const getTypes = <T>(prisma: tPrisma, storeId: number): Promise<T> => {
    return prisma.types.findMany({
        select: {
            id: true,
            type: true,
        },
        where: { active: true },
        orderBy: { type: 'asc' },
    }) as any;
};
