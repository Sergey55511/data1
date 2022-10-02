import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getOrder } from '../../../../../Backend/Data/Requests/Data/Orders/Order/getOrder';
import { postOrderResult } from '../../../../../Backend/Data/Requests/Data/Orders/Order/postOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iData>({
                req,
                res,
                fetch: () => getOrder(req),
            });
            break;
        }
        case 'POST': {
            await fetchService<iData>({
                req,
                res,
                fetch: () => postOrderResult(req),
            });
            break;
        }
    }
}
