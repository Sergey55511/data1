import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { iCookies } from '../../Store/interfaces';
import { varifyJWT } from '../../Services/verifyJWT';
import { MyError } from '../../Classes/error';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = req.cookies as iCookies;
    try {
        await varifyJWT(req, res, cookies);

        const result = await prisma.stores.findMany();

        if (result) res.status(200).json(result);
    } catch (err) {
        const error = err as MyError;
        res.status(error.status).json({ message: error.message });
    }
}
