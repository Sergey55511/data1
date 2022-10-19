import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { leftovers } from '../../../Backend/Data/Requests/Data/leftovers';
import { iData } from '../../../Shared/Types/interfaces';
import { tPrisma } from '../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const storeId: any = req.query.storeId;

    await fetchService<iData>({
        req,
        res,
        fetch: (prisma: tPrisma) => leftovers(prisma, storeId),
    });
}
