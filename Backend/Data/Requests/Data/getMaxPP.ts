import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getMaxPP = <T>(prisma: tPrisma, storeId: number): PrismaPromise<T> => {
    return prisma.data
        .aggregate({ _max: { pp: true }, where: { active: true, storeId } })
        .then((data) => data._max.pp) as any;
};
