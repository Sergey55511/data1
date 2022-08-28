import { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from './verifyJWT';
import { resError } from './Helpers';
import { PrismaPromise } from '@prisma/client';

export const getFromDB = async (
    req: NextApiRequest,
    res: NextApiResponse,
    callBack: <T>() => PrismaPromise<T>,
) => {
    try {
        await varifyJWT(req, res);

        const result = callBack();

        if (result) res.status(200).json(result);
    } catch (err) {
        resError(err, res);
    }
};
