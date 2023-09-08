import { tPrisma } from '../../../../types';

export const getResultsAssemble = <T>(
    prisma: tPrisma,
): Promise<T> => {
    return prisma.resultsAssemble.findMany({
        select: {
            id: true,
            resultAssemble: true,
        },
        where: {
            active: true,
        },
        orderBy: { resultAssemble: 'asc' },
    }) as any;
};
