import { tPrisma } from '../../../../types';

export const getColorsAssemble = <T>(prisma: tPrisma): Promise<T> => {
    return prisma.colorsAssemble.findMany({
        select: {
            id: true,
            colorAssemble: true,
        },
        where: {
            active: true,
        },
        orderBy: { colorAssemble: 'asc' },
    }) as any;
};
