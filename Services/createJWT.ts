import { makeRandomString } from '../Helpers';
import { iUser } from '../Store/interfaces';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export const KEY = 'fb9ae69cdc6f6a3c61b91c658e9cd2f2';

export const createJWT = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: iUser,
) => {
    const refrashToken = makeRandomString();
    const atkn = jwt.sign(
        { login: user.login, status: user.status, store: user.store },
        KEY,
        {
            expiresIn: 60 * 60,
        },
    );
    const rtkn = jwt.sign({ login: user.login, key: refrashToken }, KEY);
    try {
        await prisma.users.update({
            data: {
                key: refrashToken,
            },
            where: {
                id: user.id,
            },
        });
        const cookies = new Cookies(req, res);

        cookies.set('atkn', atkn, {
            httpOnly: true,
        });
        cookies.set('rtkn', rtkn, {
            httpOnly: true,
        });
        res.status(200).json({
            login: user.login,
            status: user.status,
        });
    } catch (err) {
        throw err;
    }

    return { atkn, rtkn };
};
