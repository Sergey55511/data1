import { PrismaPromise } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { resError } from '../../../Shared/Helpers';
import { varifyJWT } from './verifyJWT';

export const fetchService = async <T>({
    req,
    res,
    fetch,
    validation,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    fetch: () => PrismaPromise<T>;
    validation?: (req?: NextApiRequest) => void;
}) => {
    try {
        await varifyJWT(req, res);
        console.log('after verifyJWT');
        if (validation) validation(req);
        const result = await fetch();

        console.log('result', result);

        if (result) {
            res.status(200).json(result);
            return;
        }
        res.status(204).json('no content');
    } catch (err) {
        resError(err, res);
    }
};
