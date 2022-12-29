import { tPrisma } from '../../../../types';

export const getVariantsAssemble = <T>(
    prisma: tPrisma
): Promise<T> => {
    return prisma.variantsAssemble.findMany({
        select: {
            id: true,
            variantAssemble: true,
        },
        where: {
            active: true,
        },
        orderBy: { variantAssemble: 'asc' },
    }) as any;
};
