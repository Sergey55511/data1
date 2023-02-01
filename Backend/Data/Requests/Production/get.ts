import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';
import { NextApiRequest } from 'next';
import { dal } from './Dal';

export const getProduction = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    const data = dal(req.query);

    return prisma.productions.findMany({
        select: {
            id: true,
            description: true,
            Data: {
                select: { task: true, fullModelId: true },
                where: { OR: [{ task: true }, { fullModelId: true }] },
            },
        },
        where: { id: data.productionId },
    }) as any;
};
