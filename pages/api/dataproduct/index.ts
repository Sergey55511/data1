import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iData } from '../../../Shared/Types/interfaces';
import { orders } from '../../../Backend/Data/Requests/Data/Orders';
import { tPrisma } from '../../../Backend/types';
import { postDataProduct } from '../../../Backend/Data/Requests/DataProduct/Post';
import { getDataProduct } from '../../../Backend/Data/Requests/DataProduct/Get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma: tPrisma) => getDataProduct(prisma, req),
            });
            break;
        }
        case 'POST': {
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma: tPrisma) => postDataProduct(prisma, req),
            });
            break;
        }
    }
}
