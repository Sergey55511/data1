import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const getProfile = <T>(prisma: tPrisma): PrismaPromise<T> => {
    return prisma.profile.findMany({
        select: {
            id: true,
            profile: true,
        },
        where: { active: true, FullModels: { some: { active: true } } },
        orderBy: { profile: 'asc' },
    }) as any;
};
