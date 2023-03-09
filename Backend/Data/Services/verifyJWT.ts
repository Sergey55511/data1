import { iCookies, iUser } from '../../../Shared/Types/interfaces';
import jwt from 'jsonwebtoken';
import { Prisma, PrismaClient } from '@prisma/client';
import { createJWT } from './createJWT';
import { NextApiRequest, NextApiResponse } from 'next';
import { MyError } from '../../../Shared/Classes/error';
import { createAtkn } from '../../../Shared/Helpers';
import { KEY } from '../../../Configs/jwtKey';

export const varifyJWT = async (
    req: NextApiRequest,
    res: NextApiResponse,
    prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
) => {
    const cookies = req.cookies as iCookies;
    try {
        const atkn = jwt.verify(cookies.atkn, KEY) as iUser;
        return createAtkn(atkn);
    } catch (err) {
        try {
            const rtkn = jwt.verify(cookies.rtkn, KEY) as { login: string; key: string };

            const result = await prisma.users.findFirst({
                select: {
                    id: true,
                    key: true,
                    login: true,
                    status: true,
                    store: { select: { id: true, name: true } },
                },
                where: {
                    login: rtkn.login.toLowerCase(),
                    activ: true,
                },
            });

            const user = {
                ...result,
                store: result?.store?.name,
                storeId: result?.store?.id,
            } as iUser;

            if (user.key == rtkn.key) {
                await createJWT(req, res, user, prisma);
            } else {
                throw new MyError(401);
            }
            return user;
        } catch (error) {
            throw new MyError(401);
        }
    }
};
