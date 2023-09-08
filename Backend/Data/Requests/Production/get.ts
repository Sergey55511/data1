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
                select: { task: true },
                where: { task: { not: null } },
            },
        },
        where: { id: data.productionId },
    });

    const fullModal = production?.Data.find((item) => item.task);
    const fullModalId = fullModal?.task;

    return {
        id: production?.id,
        description: production?.description,
        fullModalId,
    } as any;
};
