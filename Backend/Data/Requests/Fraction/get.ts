import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getFraction = <T>(): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.fraction.findMany({
        select: { id: true, fraction: true },
        where: { active: true },
        orderBy: { position: 'asc' },
    }) as any;
};
