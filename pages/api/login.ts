// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { createJWT } from '../../Services/createJWT';
import { iUser } from '../../Store/interfaces';
import sha1 from 'sha1';
import { KEY } from './registration';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        const password = sha1(req.body.password + KEY);
        try {
            const result = await prisma.users.findFirst({
                select: {
                    id: true,
                    key: true,
                    login: true,
                    status: true,
                    store: { select: { name: true } },
                },
                where: {
                    login: req.body.login.toLowerCase(),
                    password,
                    activ: true,
                },
            });

            const user = { ...result, store: result?.store?.name } as iUser;

            if (user.login) {
                await createJWT(req, res, user);
            }
        } catch (err) {
            res.status(401).json({
                message: 'Отказ в доступе',
            });
        }
    }
}
