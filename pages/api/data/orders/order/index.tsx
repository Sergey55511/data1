import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getOrder } from '../../../../../Backend/Data/Requests/Data/Orders/Order/getOrder';
import { postOrderResult } from '../../../../../Backend/Data/Requests/Data/Orders/Order/Post';
import { validOrderResult } from '../../../../../Backend/Data/Validation/Data/Order/validOrderResult';
import { tPrisma } from '../../../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma: tPrisma) => getOrder(prisma, req),
            });
            break;
        }
        case 'POST': {
            await fetchService<iData>({
                req,
                res,
                validation: (prisma: tPrisma) => validOrderResult(prisma, req),
                fetch: (prisma: tPrisma) => postOrderResult(prisma, req),
                isSendUsersNewMaxId: true,
            });
            break;
        }
    }
}
