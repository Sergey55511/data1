import type { NextApiRequest, NextApiResponse } from 'next';
import { getMoveOutExcelReport } from '../../../../Backend/Data/Requests/ListOperations/Excel/get';
import { fetchService } from '../../../../Backend/Data/Services/fetch';

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
                    res.setHeader(
                        'Content-disposition',
                        'attachment;filename=listOperations.xlsx',
                    );
                    res.send(result);
                },
            });
            break;
    }
}
