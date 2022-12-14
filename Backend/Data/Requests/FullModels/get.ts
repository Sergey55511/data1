import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getFullModels = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    const data = dal(req);
    return prisma.fullModels.findMany({
        select: { id: true, modelId: true },
        where: { active: true },
    }) as any;
};
