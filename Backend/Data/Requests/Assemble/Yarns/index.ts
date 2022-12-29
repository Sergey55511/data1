import { tPrisma } from '../../../../types';

export const getYarnsAssemble = <T>(prisma: tPrisma): Promise<T> => {
    return prisma.yarnsAssemble.findMany({
        select: {
            id: true,
            yarnAssemble: true,
        },
        where: {
            active: true,
        },
        orderBy: { yarnAssemble: 'asc' },
    }) as any;
};
