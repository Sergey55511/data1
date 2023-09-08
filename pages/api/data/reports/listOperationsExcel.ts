import type { NextApiRequest, NextApiResponse } from 'next';
import { getMoveOutExcelReport } from '../../../../Backend/Data/Requests/ListOperations/Excel/get';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { responseHandlerExcel } from '../../../../Backend/Helpers/responseHandlerExcel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<{ lot: number }>({
                req,
                res,
                fetch: (prisma, user) => getMoveOutExcelReport(prisma, req, user),
                responseHandler: responseHandlerExcel,
            });
            break;
        default:
            res.status(404);
    }
}
