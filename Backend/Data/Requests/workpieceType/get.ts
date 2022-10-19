import { tPrisma } from '../../../types';

export const getWorkpieceType = <T>(prisma: tPrisma): Promise<T> => {
    return prisma.workpieceType.findMany({
        select: {
            id: true,
            workpieceType: true,
        },
        where: { active: true, isShow: true },
        orderBy: { workpieceType: 'asc' },
    }) as any;
};
