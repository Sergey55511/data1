import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getMaxId = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.data
        .aggregate({ _max: { id: true }, where: { active: true, storeId } })
        .then((data) => data._max.id) as any;
};
