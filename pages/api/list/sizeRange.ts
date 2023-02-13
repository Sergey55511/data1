import type { NextApiRequest, NextApiResponse } from 'next';
import { getSizeRange } from '../../../Backend/Data/Requests/SizeRange/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iSizeRange } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iSizeRange>({
                req,
                res,
                fetch: (prisma, user) => getSizeRange(prisma, req, user),
            });
            break;
        }
    }
}
