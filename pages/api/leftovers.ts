import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../Services/verifyJWT';
import { resError } from '../../Services/Helpers';
import { prisma } from '../../Services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await varifyJWT(req, res);
        const result = await prisma.data.groupBy({
            by: ['operation'],
            _sum: {
                widthIn: true,
                widthOut: true,
            },
        });

        if (result) res.status(200).json(result);
    } catch (err) {
        resError(err, res);
    }
}
