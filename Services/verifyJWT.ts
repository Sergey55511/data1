import { iCookies, iUser } from '../Store/interfaces';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { createJWT, KEY } from './createJWT';
import { NextApiRequest, NextApiResponse } from 'next';
import { MyError } from '../Classes/error';
const prisma = new PrismaClient();

export const varifyJWT = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    const cookies = req.cookies as iCookies;
    try {
        const atkn = jwt.verify(cookies.atkn, KEY) as iUser;

        return { login: atkn.login, status: atkn.status, store: atkn.store };
    } catch (err) {
        try {
            const rtkn = jwt.verify(cookies.rtkn, KEY) as { login: string; key: string };
            const result = await prisma.users.findFirst({
                select: {
                    id: true,
                    key: true,
                    login: true,
                    status: true,
                    store: { select: { name: true } },
                },
                where: {
                    login: rtkn.login.toLowerCase(),
                    activ: true,
                },
            });

            const user = { ...result, store: result?.store?.name } as iUser;

            if (user.key == rtkn.key) {
                createJWT(req, res, user);
            } else {
                throw new MyError(401);
            }
        } catch (error) {
            throw new MyError(401);
        }
    }
};
