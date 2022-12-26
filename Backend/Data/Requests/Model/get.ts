import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getModel = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    const data = dal(req.query);

    return prisma.models.findMany({
        select: {
            id: true,
            model: true,
        },
        where: {
            active: true,
            FullModels: {
                some: {
                    workpieceTypeId: data.workpieceTypeId,
                    profileId: data.profileId,
                    active: true,
                },
            },
        },
        orderBy: { model: 'asc' },
    }) as any;
};
