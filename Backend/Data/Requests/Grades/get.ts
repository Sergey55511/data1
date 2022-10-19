import { tPrisma } from '../../../types';

export const getGrades = <T>(prisma: tPrisma, storeId: number): Promise<T> => {
    return prisma.grade.findMany({
        select: {
            id: true,
            grade: true,
        },
        where: { activ: true },
        orderBy: { grade: 'asc' },
    }) as any;
};
