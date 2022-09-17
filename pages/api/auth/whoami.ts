// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../../Services/verifyJWT';
import { resError } from '../../../Services/Helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await varifyJWT(req, res);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(401);
        }
    } catch (err) {
        resError(err, res);
    }
}
