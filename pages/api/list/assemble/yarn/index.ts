import type { NextApiRequest, NextApiResponse } from 'next';
import { getYarnsAssemble } from '../../../../../Backend/Data/Requests/Assemble/Yarns';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService({
                req,
                res,
                fetch: (prisma: tPrisma) => getYarnsAssemble(prisma),
            });
            break;
        }
    }
}
