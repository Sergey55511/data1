import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getMaxLot = <T>(prisma:tPrisma): PrismaPromise<T> => {
    return prisma.$queryRaw`
        SELECT max(lot) as lot	FROM public."Data";
    `.then((res) => (Array.isArray(res) ? res[0] : res)) as any;
};
