import { PrismaClient } from '@prisma/client';

export const getGrades = <T>(storeId: number): Promise<T> => {
    const prisma = new PrismaClient();
    return prisma.grade.findMany({
        select: {
            id: true,
            grade: true,
        },
        where: { activ: true },
        orderBy: { grade: 'asc' },
    }) as any;
};
