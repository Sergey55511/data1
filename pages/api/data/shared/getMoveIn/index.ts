import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { getMoveIn } from '../../../../../Backend/Data/Requests/Data/Shared/getMoveIn/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: (prisma, user) =>
            getMoveIn(prisma, user.storeId, req.query.numDocument as string),
    });
}
