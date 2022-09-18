import type { NextApiRequest, NextApiResponse } from 'next';
import { getService } from '../../../Data/Services/get';
import { getMaxLot } from '../../../Data/Requests/Data/getMaxLot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    getService<{ lot: number }>({
        req,
        res,
        fetch: () => getMaxLot(),
    });
}
