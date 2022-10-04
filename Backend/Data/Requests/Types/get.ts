import { PrismaClient } from '@prisma/client';

export const getTypes = <T>(storeId: number): Promise<T> => {
    const prisma = new PrismaClient();
    return prisma.types.findMany({
        select: {
            id: true,
            type: true,
        },
        where: { active: true },
        orderBy: { type: 'asc' },
    }) as any;
};
