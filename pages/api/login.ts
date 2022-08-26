// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { createJWT } from '../../Services/createJWT';
import { iUser } from '../../Store/interfaces';
import sha1 from 'sha1';
import { KEY } from './registration';
import { MyError } from '../../Classes/error';
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
                res.status(200).json(user);
                return;
            }
            throw new MyError(401);
        } catch (err) {
            const error = err as MyError;
            res.status(error.status).json({ message: error.message });
        }
    }
}
