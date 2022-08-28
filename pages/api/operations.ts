import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { varifyJWT } from '../../Services/verifyJWT';
import { resError } from '../../Services/Helpers';
import { getFromDB } from '../../Services/getFromDB';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const storesId = req.query.storeId as string;
    console.log('storesId', storesId);

    try {
        await varifyJWT(req, res);
        const result = await prisma.storeOperations.findFirst({
            select: {
                Opereytion: { select: { id: true, opereytion: true } },
            },
            where: { storesId: +storesId },
        });

        if (result) res.status(200).json(result.Opereytion);
    } catch (err) {
        resError(err, res);
    }
}
