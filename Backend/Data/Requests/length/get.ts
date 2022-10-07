import { PrismaClient } from '@prisma/client';

export const getLength= <T>(): Promise<T> => {
    const prisma = new PrismaClient();
    return prisma.length.findMany({
        select: {
            id: true,
            length: true,
        },
        where: { active: true },
        orderBy: { length: 'asc' },
    }) as any;
};
