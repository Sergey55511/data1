import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../../Shared/Types/interfaces';
import { responseHandlerExcel } from '../../../../../Backend/Helpers/responseHandlerExcel';
import { ordersExcel } from '../../../../../Backend/Data/Requests/Data/Orders/Excel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        fetch: (prisma, user) => ordersExcel(prisma, user),
        responseHandler: responseHandlerExcel,
    });
}
