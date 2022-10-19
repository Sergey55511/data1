import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../Backend/Data/Services/verifyJWT';
import { resError } from '../../Shared/Helpers';
import { prisma } from '../../Backend/Data/Services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await varifyJWT(req, res,prisma);

        const result = await prisma.stores.findMany();

        if (result) res.status(200).json(result);
    } catch (err) {
        resError(err, res);
    }
}
