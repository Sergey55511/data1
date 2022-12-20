import { PrismaPromise } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { KEY } from '../../../../Services/createJWT';
import { NextApiRequest } from 'next';
import { iCookies, iDataTable, iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';

export const postOrderResult = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): PrismaPromise<T> => {
    let data = req.body as iDataTable[];
    const cookies = req.cookies as iCookies;
    const atkn = jwt.verify(cookies?.atkn, KEY) as iUser;
    const storeId = atkn.storeId;

    if (storeId)
        data = data.map((item) => ({
            ...item,
            storeId: +storeId,
            widthIn: item.widthIn ? +item.widthIn : undefined,
        }));

    return prisma.data.createMany({ data: data }) as any;
};
