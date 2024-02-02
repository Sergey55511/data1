// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../../Backend/Data/Services/verifyJWT';
import { resError } from '../../../Shared/Helpers';
import prisma from '../../../Backend/Data/Services/prisma';
import { logger } from '../../../Backend/Helpers/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await varifyJWT(req, res, prisma);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(401);
        }
    } catch (err) {
        resError(err, res);
    } finally {
        logger(res);
    }
}
