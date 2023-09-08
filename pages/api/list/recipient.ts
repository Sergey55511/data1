import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecipient } from '../../../Backend/Data/Requests/recipient/get';
import { postRecipient } from '../../../Backend/Data/Requests/recipient/post';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../Backend/types';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma, user) => getRecipient(prisma, req, user),
            });
            break;
        }
        case 'POST': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma: tPrisma) => postRecipient(prisma, req.body),
            });
            break;
        }
    }
}
