import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { getMaxId } from '../../../Backend/Data/Requests/Data/getMaxId';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: () => getMaxId(+req.query.storeId! as number),
    });
}
