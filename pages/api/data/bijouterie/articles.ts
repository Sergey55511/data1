import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../Shared/Types/interfaces';
import { getBijouterieArticles } from '../../../../Backend/Data/Requests/Data/Bijouterie/Articles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => getBijouterieArticles(prisma, user),
            });
            break;
        default:
            res.status(404);
    }
}
