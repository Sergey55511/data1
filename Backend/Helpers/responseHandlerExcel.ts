import { NextApiResponse } from 'next';

export const responseHandlerExcel = (res: NextApiResponse, result: Blob) => {
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-disposition', 'attachment;filename=listOperations.xlsx');
    res.send(result);
};
