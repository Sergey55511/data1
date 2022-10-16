import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { getShared } from '../../../../Backend/Data/Requests/Data/Shared/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
    await fetchService<{ lot: number }>({
        req,
        res,
        fetch: () => getShared(+req.query.storeId! as number),
    });
}
