import type { NextApiRequest, NextApiResponse } from 'next';
import { getColors } from '../../../Backend/Data/Requests/Colors/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma, user) => getColors(prisma, req, user),
            });
            break;
        }
    }
}
