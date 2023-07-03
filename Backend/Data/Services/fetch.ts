import { NextApiRequest, NextApiResponse } from 'next';
import { resError } from '../../../Shared/Helpers';
import { varifyJWT } from './verifyJWT';
import { tPrisma } from '../../types';
import { sendUsersNewMaxId } from './sendUsersNewMaxId';
import { iUser } from '../../../Shared/Types/interfaces';
import { prisma } from './prisma';

export const fetchService = async <T>({
    req,
    res,
    fetch,
    validation,
    isSendUsersNewMaxId,
    responseHandler = (res, result) => res.status(200).json(result),
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    fetch: (prisma: tPrisma, user: iUser) => Promise<T>;
    validation?: (prisma: tPrisma, user: iUser) => void;
    isSendUsersNewMaxId?: boolean;
    responseHandler?: (res: NextApiResponse, result: any) => void;
}) => {
    try {
        const user = await varifyJWT(req, res, prisma);
        if (validation) await validation(prisma, user);
        const result = await fetch(prisma, user);

        if (isSendUsersNewMaxId) {
            await sendUsersNewMaxId(prisma, user.storeId);
        }

        if (result) {
            responseHandler(res, result);
            return;
        }
        res.status(204).json('no content');
    } catch (err) {
        resError(err, res);
    }
};
