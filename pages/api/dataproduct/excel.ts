import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { responseHandlerExcel } from '../../../Backend/Helpers/responseHandlerExcel';
import { getDataProductExcel } from '../../../Backend/Data/Requests/DataProduct/Excel/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<{ lot: number }>({
                req,
                res,
                fetch: (prisma, user) => getDataProductExcel(prisma, req, user),
                responseHandler: responseHandlerExcel,
            });
            break;
        default:
            res.status(404);
    }
}
