import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';

export const getFullModels = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    return prisma.fullModels.findMany({
        // select: { id: true, modelId: true },
        include: { LengthModel: true },
        where: { active: true },
    }) as any;
};
