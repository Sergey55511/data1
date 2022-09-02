import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../Services/verifyJWT';
import { resError } from '../../Services/Helpers';
import { prisma } from '../../Services/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await varifyJWT(req, res);
        const result = await prisma.$queryRaw`SELECT 
                "workpieceType",
                model,
                "sizeRange",
                "colorType",
                length,
                channel,
                grade,
                state,
                lot,
                "numProduction",
                round(sum("widthIn")::numeric,2)-round(sum("widthOut")::numeric,2) as "width",
                round(sum("countItemsIn")::numeric,2)-round(sum("countItemsOut")::numeric,2) as "count",
                sum("moneyIn")-sum("moneyOut") as "code"
            FROM 
                public."Data"	
            GROUP BY 
                "workpieceType",
                model,
                "sizeRange",
                "colorType",
                length,
                channel,
                grade,
                state,
                lot,
                "numProduction"
            HAVING round(sum("widthIn")::numeric,2)-round(sum("widthOut")::numeric,2)>0;`;

        if (result) res.status(200).json(result);
    } catch (err) {
        resError(err, res);
    }
}
