import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../Services/verifyJWT';
import { resError } from '../../Services/Helpers';
import { prisma } from '../../Services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const storesId = req.query.storeId as string;

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
