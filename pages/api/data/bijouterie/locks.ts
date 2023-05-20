import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../Shared/Types/interfaces';
import { getLock } from '../../../../Backend/Data/Requests/Data/Bijouterie/Locks';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => getLock(prisma, req, user),
            });
            break;
        default:
            res.status(404);
    }
}
