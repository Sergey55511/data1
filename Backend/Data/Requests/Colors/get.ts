import { tPrisma } from '../../../types';

export const getColors = <T>(prisma: tPrisma, storeId: number): Promise<T> => {
    return prisma.color.findMany({
        select: {
            id: true,
            color: true,
        },
        where: { activ: true },
        orderBy: { color: 'asc' },
    }) as any;
};
