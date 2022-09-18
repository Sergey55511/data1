import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getMaxLot = <T>(): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.$queryRaw`
        SELECT max(lot) as lot	FROM public."Data";
    `.then((res) => (Array.isArray(res) ? res[0] : res)) as any;
};
