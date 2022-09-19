import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const postNewItems = <T>(data: any): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.data.createMany({ data }) as any;
};
