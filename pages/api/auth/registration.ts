import { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../../Services/verifyJWT';
import sha1 from 'sha1';
import { resError } from '../../../Services/Helpers';
import { prisma } from '../../../Services/prisma';

export const KEY = 'b6d48d1d41be922130ce2a32e1dab1fc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = await varifyJWT(req, res);
        const login = req.body.login.toLowerCase();
        const status = req.body.status;
        const storesId = req.body.store;
        const password = sha1(req.body.password + KEY);

        if (user?.status == 'admin') {
            try {
                await prisma.users.create({
                    data: {
                        login,
                        password,
                        status,
                        storesId,
                    },
                });
                res.status(200).json({ message: 'Пользователь создан' });
            } catch (err) {
                resError(err, res);
            }
        }
    } catch (err) {
        resError(err, res);
    }
}
