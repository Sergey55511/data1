import { PrismaClient } from '@prisma/client';

export const getColors = <T>(storeId: number): Promise<T> => {
    const prisma = new PrismaClient();
    return prisma.color.findMany({
        select: {
            id: true,
            color: true,
        },
        where: { activ: true },
        orderBy: { color: 'asc' },
    }) as any;
};
