import { iCookies, iUser } from '../../../Shared/Types/interfaces';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { createJWT, KEY } from './createJWT';
import { NextApiRequest, NextApiResponse } from 'next';
import { MyError } from '../../../Shared/Classes/error';
import { createAtkn } from '../../../Shared/Helpers';
const prisma = new PrismaClient();

export const varifyJWT = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = req.cookies as iCookies;
    try {
        const atkn = jwt.verify(cookies.atkn, KEY) as iUser;
        console.log('atkn', atkn);

        return createAtkn(atkn);
    } catch (err) {
        try {
            const rtkn = jwt.verify(cookies.rtkn, KEY) as { login: string; key: string };
            console.log('rtkn', rtkn);

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

            console.log('resultJWT', result);

            const user = {
                ...result,
                store: result?.store?.name,
                storeId: result?.store?.id,
            } as iUser;

            if (user.key == rtkn.key) {
                console.log('createJWT');

                await createJWT(req, res, user)
            } else {
                throw new MyError(401);
            }
            return user
        } catch (error) {
            throw new MyError(401);
        }
    }
};
