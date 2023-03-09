import { makeRandomString } from '../../../Shared/Helpers/index';
import { iUser } from '../../../Shared/Types/interfaces';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { createAtkn } from '../../../Shared/Helpers';
import { Prisma, PrismaClient } from '@prisma/client';
import { KEY } from '../../../Configs/jwtKey';

export const createJWT = async (
    req: NextApiRequest,
    res: NextApiResponse,
    user: iUser,
    prisma: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
) => {
    const refrashToken = makeRandomString();

    const atkn = jwt.sign(createAtkn(user), KEY, {
        expiresIn: 60 * 60,
    });

    console.log('createJWT_atkn', atkn);

    const rtkn = jwt.sign({ login: user.login, key: refrashToken }, KEY);

    console.log('createJWT_rtkn', atkn);

    try {
        await prisma.users.update({
            data: {
                key: refrashToken,
            },
            where: {
                id: user.id,
            },
        });

        console.log('key updated');

        const cookies = new Cookies(req, res);

        cookies.set('atkn', atkn, {
            httpOnly: true,
        });
        cookies.set('rtkn', rtkn, {
            httpOnly: true,
        });
    } catch (err) {
        console.log('createJWT error');
        throw err;
    }

    return { atkn, rtkn };
};
