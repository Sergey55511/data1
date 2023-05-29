import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../Shared/Types/interfaces';
import { getMinorAccessoryLeftovers } from '../../../../Backend/Data/Requests/Data/Bijouterie/MinorAccessoryLeftovers/Get';
import { postMinorAccessoryLeftovers } from '../../../../Backend/Data/Requests/Data/Bijouterie/MinorAccessoryLeftovers/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => getMinorAccessoryLeftovers(prisma, req, user),
            });
            break;
        case 'POST':
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => postMinorAccessoryLeftovers(prisma, req, user),
            });
            break;
        default:
            res.status(404);
    }
}
