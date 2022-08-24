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
    token: iCookies,
) => {
    try {
        const atkn = jwt.verify(token.atkn, KEY) as iUser;
        return { login: atkn.login, status: atkn.status };
    } catch (err) {
        try {
            const rtkn = jwt.verify(token.rtkn, KEY) as { login: string; key: string };
            const user = (await prisma.users.findFirst({
                where: {
                    login: rtkn.login.toLowerCase(),
                    activ: true,
                },
            })) as iUser;
            if (user.key == rtkn.key) {
                createJWT(req, res, user);
            } else {
                throw new MyError(401)
                res.status(401).json({ message: 'доступ запрещен!' });
            }
        } catch (error) {
            throw new MyError(401)
            res.status(401).json({ message: 'доступ запрещен!' });
        }
    }
};
