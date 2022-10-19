import { tPrisma } from '../../../types';

export const getUsers = <T>(prisma: tPrisma, storeId: number): Promise<T> => {
    return prisma.users.findMany({
        select: {
            id: true,
            login: true,
        },
        where: { activ: true },
        orderBy: { login: 'asc' },
    }) as any;
};
