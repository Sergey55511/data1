import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getSizeRangeModel = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    const data = dal(req.query);

    return prisma.sizeRange.findMany({
        select: {
            id: true,
            sizeRange: true,
        },
        where: {
            active: true,
            size: { lte: data.size },
            FullModels: {
                some: {
                    workpieceTypeId: data.workpieceTypeId,
                    profileId: data.profileId,
                    modelId: data.modelId,
                    active: true,
                },
            },
        },
        orderBy: { sizeRange: 'asc' },
    }) as any;
};
