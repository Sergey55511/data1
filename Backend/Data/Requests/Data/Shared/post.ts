import { PrismaPromise } from '@prisma/client';
import { iDataTable } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';

export const postMoveIn = <T>(prisma: tPrisma, data: iDataTable[]): PrismaPromise<T> => {
    return prisma.data.createMany({ data }) as any;
};
