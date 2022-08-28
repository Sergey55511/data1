import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { iCookies } from '../../Store/interfaces';
import { varifyJWT } from '../../Services/verifyJWT';
import { resError } from '../../Services/Helpers';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await varifyJWT(req, res);

        const result = await prisma.stores.findMany();

        if (result) res.status(200).json(result);
    } catch (err) {
        resError(err, res);
    }
}
