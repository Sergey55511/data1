// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { PrismaClient } from '@prisma/client';
import { createJWT } from '../../Services/createJWT';
import { iCookies, iUser } from '../../Store/interfaces';
import { varifyJWT } from '../../Services/verifyJWT';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = req.cookies as iCookies;
    const result = await varifyJWT(req, res, cookies);
    if (result) res.status(200).json(result);
}
