import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteManager } from '../../../Backend/Data/Requests/Managers/Delete';
import { getManagers } from '../../../Backend/Data/Requests/Managers/Get';
import { patchManagers } from '../../../Backend/Data/Requests/Managers/Patch';
import { postManagers } from '../../../Backend/Data/Requests/Managers/Post';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../Backend/types';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma, user) => getManagers(prisma, req.query, user),
            });
            break;
        }
        case 'POST': {
            await fetchService({
                req,
                res,
                fetch: (prisma: tPrisma) => postManagers(prisma, req.body as any),
            });
            break;
        }
        case 'DELETE': {
            await fetchService({
                req,
                res,
                fetch: (prisma: tPrisma) => deleteManager(prisma, req.query as any),
            });
            break;
        }
        case 'PATCH': {
            await fetchService({
                req,
                res,
                fetch: (prisma: tPrisma) => patchManagers(prisma, req.body as any),
            });
            break;
        }
    }
}
