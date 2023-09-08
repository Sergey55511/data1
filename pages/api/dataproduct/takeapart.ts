import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iData, iUser } from '../../../Shared/Types/interfaces';
import { tPrisma } from '../../../Backend/types';
import { takeApart } from '../../../Backend/Data/Requests/DataProduct/TakeApart';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma: tPrisma, user: iUser) => takeApart(prisma, req, user),
            });
            break;
        }
    }
}
