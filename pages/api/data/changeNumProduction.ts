import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iData } from '../../../Shared/Types/interfaces';
import { changeNumProduction } from '../../../Backend/Data/Requests/Data/changeNumProduction';
import { tPrisma } from '../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        fetch: (prisma: tPrisma) => changeNumProduction(prisma, [req.body]),
        isSendUsersNewMaxId: true,
    });
}
