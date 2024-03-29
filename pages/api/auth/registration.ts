import { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../../Backend/Data/Services/verifyJWT';
import sha1 from 'sha1';
import { resError } from '../../../Shared/Helpers';
import prisma from '../../../Backend/Data/Services/prisma';
import { logger } from '../../../Backend/Helpers/logger';

export const KEY = 'b6d48d1d41be922130ce2a32e1dab1fc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await varifyJWT(req, res, prisma);
        const login = req.body.login.toLowerCase();
        const status = req.body.status;
        const storeId = +req.body.storeId;
        const password = sha1(req.body.password + KEY);

        if (user?.status == 'admin') {
            try {
                await prisma.users.create({
                    data: {
                        login,
                        password,
                        status,
                        storeId,
                    },
                });
                res.status(200).json({ message: 'Пользователь создан' });
            } catch (err) {
                resError(err, res);
            }
        }
    } catch (err) {
        resError(err, res);
    } finally {
        logger(res);
    }
}
