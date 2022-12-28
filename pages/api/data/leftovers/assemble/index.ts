import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../Backend/types';
import { getLeftoversAssemble } from '../../../../../Backend/Data/Requests/Data/Leftovers/Assemble';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        fetch: (prisma: tPrisma) => getLeftoversAssemble(prisma, req),
    });
}
