import { tPrisma } from '../../../../types';

export const getGradesAssemble = <T>(prisma: tPrisma): Promise<T> => {
    return prisma.gradesAssemble.findMany({
        select: {
            id: true,
            gradeAssemble: true,
        },
        where: {
            active: true,
        },
        orderBy: { gradeAssemble: 'asc' },
    }) as any;
};
