import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { iDataTable } from '../../../../../Shared/Types/interfaces';

export const postMoveIn = <T>(data: iDataTable[]): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.data.createMany({ data }) as any;
};
