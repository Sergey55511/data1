import type { NextApiRequest, NextApiResponse } from 'next';
import { getProfile } from '../../../Backend/Data/Requests/Profile/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../Backend/types';
import { iMaterialGroup } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iMaterialGroup>({
                req,
                res,
                fetch: (prisma: tPrisma) => getProfile(prisma, req),
            });
            break;
        }
    }
}
