import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteManagerOperations } from '../../../Backend/Data/Requests/ManagerOperationsBridge/Delete';
import { postManagerOperations } from '../../../Backend/Data/Requests/ManagerOperationsBridge/Post';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../Backend/types';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma: tPrisma) => postManagerOperations(prisma, req.body),
            });
            break;
        }
        case 'DELETE': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma: tPrisma) => deleteManagerOperations(prisma, req.query),
            });
            break;
        }
    }
}
