import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getProfile = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    const data = dal(req.query);
    return prisma.profile.findMany({
        select: {
            id: true,
            profile: true,
        },
        where: {
            active: true,
            FullModels: { some: { workpieceTypeId: data.workpieceTypeId, active: true } },
        },
        orderBy: { profile: 'asc' },
    }) as any;
};
