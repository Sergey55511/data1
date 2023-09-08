import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iOperation } from '../../../Shared/Types/interfaces';
import { tPrisma } from '../../../Backend/types';
import { getProduction } from '../../../Backend/Data/Requests/Production/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iOperation>({
                req,
                res,
                fetch: (prisma: tPrisma) => getProduction(prisma, req),
            });
            break;
        }
    }
}
