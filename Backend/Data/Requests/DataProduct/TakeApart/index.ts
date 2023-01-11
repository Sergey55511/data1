import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const takeApart = async <T>(prisma: tPrisma, req: NextApiRequest): Promise<T> => {
    const data = dal(req.body as number[]);

    console.log(data);

    return (await prisma.$queryRaw``) as any;
};
