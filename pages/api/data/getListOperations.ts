import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { getListOperations } from '../../../Backend/Data/Requests/ListOperations/Get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: (prisma, user) => getListOperations(prisma, req, user),
    });
}
