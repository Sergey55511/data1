import type { NextApiRequest, NextApiResponse } from 'next';
import { getColorsAssemble } from '../../../../../Backend/Data/Requests/Assemble/Colors';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService({
                req,
                res,
                fetch: (prisma: tPrisma) => getColorsAssemble(prisma),
            });
            break;
        }
    }
}
