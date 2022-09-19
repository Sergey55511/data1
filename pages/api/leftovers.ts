import type { NextApiRequest, NextApiResponse } from 'next';
import { getService } from '../../Backend/Data/Services/get';
import { leftovers } from '../../Backend/Data/Requests/Data/leftovers';
import { iLeftovers } from '../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const storeId: any = req.query.storeId;

    getService<iLeftovers>({
        req,
        res,
        fetch: () => leftovers(storeId),
    });
}
