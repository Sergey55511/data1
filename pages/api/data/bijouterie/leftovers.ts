import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../Shared/Types/interfaces';
import { leftoversBijouterie } from '../../../../Backend/Data/Requests/Data/Bijouterie/Leftovers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => leftoversBijouterie(prisma, req, user),
            });
            break;
        default:
            res.status(404);
    }
}
