import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getState = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    const data = dal(req.query);

    return prisma.state.findMany({
        select: { id: true, state: true },
        where: {
            active: true,
            id: { in: data.stateId },
            Bridge: { some: { workpieceTypeId: data.workpieceTypeId } },
        },
        orderBy: { id: 'asc' },
    }) as any;
};
