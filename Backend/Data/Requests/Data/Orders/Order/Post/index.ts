import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../../../types';
import { dal } from './Dal';
import { prepareData } from './prepareData';

export const postOrderResult = async (prisma: tPrisma, req: NextApiRequest) => {
    let data = dal(req);

    console.log('data1', data);

    data = await prepareData(prisma, data);

    console.log('data2', data);

    return prisma.data.createMany({ data });
};
