import { PrismaClient } from '@prisma/client';

export const getWorkpieceType = <T>(): Promise<T> => {
    const prisma = new PrismaClient();
    return prisma.workpieceType.findMany({
        select: {
            id: true,
            workpieceType: true,
        },
        where: { active: true, isShow: true },
        orderBy: { workpieceType: 'asc' },
    }) as any;
};
