import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iOperation } from '../../../Shared/Types/interfaces';
import { getOperations } from '../../../Backend/Data/Requests/Operations/Get';
import { tPrisma } from '../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iOperation>({
                req,
                res,
                fetch: (prisma: tPrisma) => getOperations(prisma, req.query),
            });
            break;
        }
    }
}
