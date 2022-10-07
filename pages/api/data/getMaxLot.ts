import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { getMaxLot } from '../../../Backend/Data/Requests/Data/getMaxLot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: () => getMaxLot(),
    });
}
