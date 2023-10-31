import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { iData } from '../../../../../Shared/Types/interfaces';
import { leftoversExcel } from '../../../../../Backend/Data/Requests/Data/Leftovers/Excel';
import { responseHandlerExcel } from '../../../../../Backend/Helpers/responseHandlerExcel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        fetch: (prisma, user) => leftoversExcel(prisma, user),
        responseHandler: responseHandlerExcel,
    });
}
