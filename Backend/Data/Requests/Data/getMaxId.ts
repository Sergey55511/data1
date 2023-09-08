import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getMaxId = <T>(prisma: tPrisma, storeId: number): PrismaPromise<T> => {
    return prisma.data
        .aggregate({ _max: { id: true }, where: { active: true, storeId } })
        .then((data) => data._max.id) as any;
};
