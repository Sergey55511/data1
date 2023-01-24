import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { getShared } from '../../../../Backend/Data/Requests/Data/Shared/get';
import { postMoveIn } from '../../../../Backend/Data/Requests/Data/Shared/post';
import { postMoveInValidation } from '../../../../Backend/Data/Validation/Data/Shared/postMoveInValidation';
import { tPrisma } from '../../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService({
                req,
                res,
                fetch: (prisma: tPrisma) =>
                    getShared(prisma, +req.query.storeId! as number),
            });
            break;
        }
        case 'POST': {
            await fetchService({
                req,
                res,
                validation: (prisma: tPrisma) => postMoveInValidation(prisma, req),
                fetch: (prisma: tPrisma) => postMoveIn(prisma, req),
                isSendUsersNewMaxId: true,
            });
            break;
        }
    }
}
