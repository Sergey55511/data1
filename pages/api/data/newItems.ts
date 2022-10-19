import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { postNewItems } from '../../../Backend/Data/Requests/Data/postNewItems';
import { tPrisma } from '../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<any>({
        req,
        res,
        fetch: (prisma: tPrisma) => postNewItems(prisma, req.body, false),
    });
}
