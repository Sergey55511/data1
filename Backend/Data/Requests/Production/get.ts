import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';
import { NextApiRequest } from 'next';
import { dal } from './Dal';

export const getProduction = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = dal(req.query);

    const production = await prisma.productions.findFirst({
        select: {
            id: true,
            description: true,
            Data: {
                select: { task: true, fullModelId: true },
                where: { OR: [{ task: { not: null } }, { fullModelId: { not: null } }] },
            },
        },
        where: { id: data.productionId },
    });

    const fullModal = production?.Data.find((item) => item.fullModelId || item.task);
    const fullModalId = fullModal?.fullModelId || fullModal?.task;

    return {
        id: production?.id,
        description: production?.description,
        fullModalId,
    } as any;
};
