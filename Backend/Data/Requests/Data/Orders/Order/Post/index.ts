import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../../../types';
import { dal } from './Dal';

export const postOrderResult = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    let data = dal(req);

    return prisma.data.createMany({ data: data }) as any;
};
