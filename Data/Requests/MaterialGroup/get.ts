import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getMaterialGroup = <T>(): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.materialGroup.findMany({
        select: { id: true, materialGroup: true },
        where: { active: true },
        orderBy: { position: 'asc' },
    }) as any;
};
