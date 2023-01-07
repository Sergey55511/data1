import { NextApiRequest } from 'next';
import { iDataProductTable } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const postDataProduct = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = req.body.map((item: iDataProductTable) => dal(item)) as any;

    return (await prisma.dataProduct.createMany({ data })) as any;
};
