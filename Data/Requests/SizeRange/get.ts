import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getSizeRange = <T>(): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.sizeRange.findMany({
        select: { id: true, sizeRange: true },
        where: { active: true },
        orderBy: { position: 'asc' },
    }) as any;
};
