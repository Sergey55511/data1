import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { getMoveIn } from '../../../../../Backend/Data/Requests/Data/Shared/getMoveIn/get';
import { tPrisma } from '../../../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: (prisma: tPrisma) =>
            getMoveIn(
                prisma,
                +req.query.storeId! as number,
                req.query.numDocument as string,
            ),
    });
}
