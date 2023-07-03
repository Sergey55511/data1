import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { getListOperations } from '../../../../Backend/Data/Requests/ListOperations/Get';
import { getMoveOutExcelReport } from '../../../../Backend/Data/Requests/Data/MoveOutExcelReport/get';
import { result } from 'lodash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            await fetchService<{ lot: number }>({
                req,
                res,
                fetch: (prisma, user) => getMoveOutExcelReport(prisma, req, user),
                responseHandler: (res, result) => {
                    res.setHeader(
                        'Content-Type',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    );
                    res.send(result);
                },
            });
            break;
    }
}
