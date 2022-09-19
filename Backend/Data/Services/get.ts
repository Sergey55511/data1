import { PrismaPromise } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { resError } from '../../../Shared/Helpers';
import { varifyJWT } from '../../../Backend/Data/Services/verifyJWT';

export const getService = async <T>({
    req,
    res,
    fetch,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    fetch: () => PrismaPromise<T>;
}) => {
    try {
        await varifyJWT(req, res);
        console.log('after verifyJWT');
        
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
