import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../Shared/Types/interfaces';
import { postDataBijouterie } from '../../../../Backend/Data/Requests/Data/Bijouterie/Data/Post';
import { getDataBijouterie } from '../../../../Backend/Data/Requests/Data/Bijouterie/Data/Get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => getDataBijouterie(prisma, req, user),
            });
            break;
        case 'POST':
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => postDataBijouterie(prisma, req, user),
            });
            break;
        default:
            res.status(404);
    }
}
