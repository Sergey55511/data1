import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { varifyJWT } from '../../Services/verifyJWT';
import { resError } from '../../Services/Helpers';
import { getFromDB } from '../../Services/getFromDB';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await varifyJWT(req, res);
        const result = await prisma.opereytion.findMany({
            select: { opereytion: true },
            where: { activ: true },
        });

        if (result) res.status(200).json(result);
    } catch (err) {
        resError(err, res);
    }
}
