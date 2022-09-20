import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../Backend/Data/Services/fetch';
import { leftovers } from '../../Backend/Data/Requests/Data/leftovers';
import { iLeftovers } from '../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const storeId: any = req.query.storeId;

    await fetchService<iLeftovers>({
        req,
        res,
        fetch: () => leftovers(storeId),
    });
}
