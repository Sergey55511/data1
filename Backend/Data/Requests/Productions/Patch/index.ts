import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { MyError } from '../../../../../Shared/Classes/error';
import { tPrisma } from '../../../../types';
import { extractData } from './extractData';

export const patchProductions = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    const { id, description, fullModelId, active } = extractData(req);
    if (!id) throw new MyError(400);
    return prisma.productions.update({
        data: { description, fullModelId, active },
        where: { id },
    }) as any;
};
