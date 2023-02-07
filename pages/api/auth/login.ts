// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createJWT } from '../../../Backend/Data/Services/createJWT';
import { iUser } from '../../../Shared/Types/interfaces';
import sha1 from 'sha1';
import { KEY } from './registration';
import { MyError } from '../../../Shared/Classes/error';
import { resError } from '../../../Shared/Helpers';
import { prisma } from '../../../Backend/Data/Services/prisma';

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
                    role: true,
                    store: { select: { id: true, name: true } },
                },
                where: {
                    login: req.body.login.toLowerCase(),
                    password,
                    activ: true,
                },
            });

            const user = {
                ...result,
                store: result?.store?.name,
                storeId: result?.store?.id,
            } as iUser;

            if (user.login) {
                await createJWT(req, res, user, prisma);
                res.status(200).json(user);
                return;
            }
            throw new MyError(401);
        } catch (err) {
            resError(err, res);
        }
    }
}
