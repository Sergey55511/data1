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
    fetch: () => Promise<T>;
    validation?: (req?: NextApiRequest) => void;
}) => {
    try {
        await varifyJWT(req, res);
        if (validation) await validation(req);
        const result = await fetch();

        if (result) {
            res.status(200).json(result);
            return;
        }
        res.status(204).json('no content');
    } catch (err) {
        resError(err, res);
    }
};