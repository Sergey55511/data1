import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { getMoveInDocument } from '../../../../Backend/Data/Requests/MoveInDocument/Get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: (prisma, user) => getMoveInDocument(prisma, req, user),
    });
}
