import type { NextApiRequest } from 'next';
import { tPrisma } from '../../../../types';
import { startQueue } from '../../../Services/Semaphore';
import { executerPaht } from './executer';

export const postNewItems = async <T>(
    _prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const { body, cookies } = req;
    return (await startQueue(executerPaht, { ...body, cookies })) as any;
};
