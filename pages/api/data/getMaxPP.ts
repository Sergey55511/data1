import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../Backend/types';
import { iUser } from '../../../Shared/Types/interfaces';
import { getMaxPP } from '../../../Backend/Data/Requests/Data/getMaxPP';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<{ lot: number }>({
                req,
                res,
                fetch: (prisma: tPrisma, user: iUser) => getMaxPP(prisma, user.storeId),
            });
            break;
        default:
            res.status(404);
    }
}
