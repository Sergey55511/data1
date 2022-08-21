import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { varifyJWT } from '../../Services/verifyJWT';
import { iCookies } from '../../Store/interfaces';
import sha1 from 'sha1';
const prisma = new PrismaClient();

export const KEY = 'b6d48d1d41be922130ce2a32e1dab1fc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = req.cookies as iCookies;
    const user = await varifyJWT(req, res, cookies);
    const login = req.body.login.toLowerCase();
    const password = sha1(req.body.password + KEY);

    if (user?.status == 'admin') {
        try {
            const result = await prisma.users.create({
                data: {
                    login,
                    password,
                    status: 'worker',
                },
            });
            res.status(200).json({ message: 'Пользователь создан' });
        } catch (err) {
            res.status(400).json({ message: 'Что то пошло не так' });
        }
    }
}
