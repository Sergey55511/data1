import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../Backend/types';
import { getGetOut } from '../../../../Backend/Data/Requests/Data/Orders/getGetOut';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma: tPrisma) => getGetOut(prisma, +req.query.storeId!),
            });
            break;
        }
    }
}
