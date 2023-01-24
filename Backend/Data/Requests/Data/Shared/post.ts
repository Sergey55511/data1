import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../types';
import { dal } from '../Dal';

export const postMoveIn = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    const data = dal(req);
    return prisma.data.createMany({ data }) as any;
};
