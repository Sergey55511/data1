import { tPrisma } from '../../../../types';

export const getTypesAssemble = <T>(prisma: tPrisma): Promise<T> => {
    return prisma.typeAssemble.findMany({
        select: {
            id: true,
            typeAssemble: true,
        },
        where: {
            active: true,
        },
        orderBy: { typeAssemble: 'asc' },
    }) as any;
};
