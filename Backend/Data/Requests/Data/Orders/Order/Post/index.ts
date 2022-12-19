import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../../../types';
import { dal } from './Dal';

export const postOrderResult = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    let data = await dal(prisma, req);

    return prisma.data.createMany({ data: data }) as any;
};
