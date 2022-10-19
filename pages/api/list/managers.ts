import type { NextApiRequest, NextApiResponse } from 'next';
import { getManagers } from '../../../Backend/Data/Requests/Managers/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../Backend/types';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma: tPrisma) =>
                    getManagers(prisma, +req.query.storeId!, +req.query.operationId!),
            });
            break;
        }
    }
}
