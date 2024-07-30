import type { NextApiRequest, NextApiResponse } from 'next';
import { getResultsAssemble } from '../../../../../Backend/Data/Requests/Assemble/Result';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService({
                req,
                res,
                fetch: (prisma: tPrisma) => getResultsAssemble(prisma, req),
            });
            break;
        }
    }
}
