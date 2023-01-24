import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../../../types';
import { dal } from '../../../Dal';
import { prepareData } from './prepareData';

export const postOrderResult = async (prisma: tPrisma, req: NextApiRequest) => {
    let data = dal(req);

    data = await prepareData(prisma, data);

    return prisma.data.createMany({ data });
};
