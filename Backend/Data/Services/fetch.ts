import { NextApiRequest, NextApiResponse } from 'next';
import { resError } from '../../../Shared/Helpers';
import { varifyJWT } from './verifyJWT';
import { PrismaClient } from '@prisma/client';
import { tPrisma } from '../../types';
import { sendUsersNewMaxId } from './sendUsersNewMaxId';
import { iUser } from '../../../Shared/Types/interfaces';

export const fetchService = async <T>({
    req,
    res,
    fetch,
    validation,
    isSendUsersNewMaxId,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    fetch: (prisma: tPrisma, user: iUser) => Promise<T>;
    validation?: (prisma: tPrisma, user: iUser) => void;
    isSendUsersNewMaxId?: boolean;
}) => {
    const prisma = new PrismaClient();
    try {
        const user = await varifyJWT(req, res, prisma);
        if (validation) await validation(prisma, user);
        const result = await fetch(prisma, user);

        if (isSendUsersNewMaxId) {
            await sendUsersNewMaxId(prisma, user.storeId);
        }

        prisma.$disconnect();
        if (result) {
            res.status(200).json(result);
            return;
        }
        res.status(204).json('no content');
    } catch (err) {
        prisma.$disconnect();
        resError(err, res);
    }
};
