import type { NextApiRequest } from 'next';
import { tPrisma } from '../../../../types';
import { startQueue } from '../../../Services/Semaphore';
import { executer } from './executer';

export const postNewItems = async <T>(
    _prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const { body, cookies } = req;
    console.log('postNewItems', 'cookies', cookies);

    return (await startQueue(() => executer({ ...body, cookies }))) as any;
};
