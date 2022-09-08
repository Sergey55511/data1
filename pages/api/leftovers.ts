import type { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../Services/verifyJWT';
import { resError } from '../../Services/Helpers';
import { prisma } from '../../Services/prisma';
import { PrismaPromise } from '@prisma/client';

interface iUser {
    name: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    getService<iUser>({
        req,
        res,
        callBack: sql
    });
}

const getService = async <T>({
    req,
    res,
    callBack,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    callBack: () => PrismaPromise<T>;
}) => {
    try {
        await varifyJWT(req, res);
        const result = await callBack();

        if (result) {
            res.status(200).json(result);
            return;
        }
        res.status(204).json('no content');
    } catch (err) {
        resError(err, res);
    }
};

const sql = <T>():PrismaPromise<T> => {
    return prisma.$queryRaw`SELECT 
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
};
