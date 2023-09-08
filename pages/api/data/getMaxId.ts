import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { getMaxId } from '../../../Backend/Data/Requests/Data/getMaxId';
import { tPrisma } from '../../../Backend/types';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: (prisma: tPrisma, user: iUser) => getMaxId(prisma, user.storeId),
    });
}
