import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../Backend/Data/Services/verifyJWT';
import { resError } from '../../Shared/Helpers';
import { prisma } from '../..//Backend/Data/Services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const storesId = req.query.storeId as string;
    console.log('storesId', storesId);

    try {
        await varifyJWT(req, res);
        console.log('afterVarifyJWT');

        const result = await prisma.storeOperations.findFirst({
            select: {
                Opereytion: { select: { id: true, opereytion: true } },
            },
            where: { storesId: +storesId },
        });

        console.log('result', result);

        if (result) res.status(200).json(result.Opereytion);
    } catch (err) {
        resError(err, res);
    }
}
