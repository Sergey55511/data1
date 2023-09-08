import type { NextApiRequest, NextApiResponse } from 'next';
import { getGrades } from '../../../Backend/Data/Requests/Grades/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma, user) => getGrades(prisma, req, user),
            });
            break;
        }
    }
}
