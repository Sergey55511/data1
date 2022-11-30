import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const deleteManagerOperations = <T>(
    prisma: tPrisma,
    params: any,
): PrismaPromise<T> => {
    const data = dal(params);

    return prisma.managerOperations.updateMany({
        data: { active: false },
        where: data,
    }) as any;
};
