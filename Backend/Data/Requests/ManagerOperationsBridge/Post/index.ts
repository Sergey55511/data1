import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const postManagerOperations = <T>(
    prisma: tPrisma,
    params: any,
): PrismaPromise<T> => {
    const data = dal(params);

    return prisma.managerOperations.create({ data }) as any;
};
