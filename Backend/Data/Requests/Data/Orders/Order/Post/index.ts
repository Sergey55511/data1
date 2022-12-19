import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../../../types';
import { dal } from './Dal';
import { prepareData } from './prepareData';

export const postOrderResult = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    let data = dal(req);

    data = await prepareData(prisma, data);

    return prisma.data.createMany({ data }) as any;
};
