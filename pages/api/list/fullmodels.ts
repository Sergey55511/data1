import type { NextApiRequest, NextApiResponse } from 'next';
import { getFullModels } from '../../../Backend/Data/Requests/FullModels/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../Backend/types';
import { iFraction } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iFraction>({
                req,
                res,
                fetch: (prisma: tPrisma) => getFullModels(prisma, req),
            });
            break;
        }
    }
}
