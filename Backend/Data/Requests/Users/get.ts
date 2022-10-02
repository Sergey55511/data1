import { PrismaClient } from '@prisma/client';

export const getUsers = <T>(storeId: number): Promise<T> => {
    const prisma = new PrismaClient();
    return prisma.users.findMany({
        select: {
            id: true,
            login: true,
        },
        where: { activ: true },
        orderBy: { login: 'asc' },
    }) as any;
};
