import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iData } from '../../../Shared/Types/interfaces';
import { orders } from '../../../Backend/Data/Requests/Data/orders';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        fetch: () => orders(+req.query.storeId!),
    });
}
