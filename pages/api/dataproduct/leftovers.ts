import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iData } from '../../../Shared/Types/interfaces';
import { getDataProductLeftovers } from '../../../Backend/Data/Requests/DataProduct/Leftovers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iData>({
                req,
                res,
                fetch: (prisma, user) => getDataProductLeftovers(prisma, user, req),
            });
            break;
        }
    }
}
