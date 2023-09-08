import { NextApiRequest } from 'next';
import { iData, iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { getListOperations } from '../Get';
import { prepareData } from './prepareData';
import { createExcel } from '../../../../Helpers/createExcel';

export const getMoveOutExcelReport = async (
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
) => {
    const reportData = await getListOperations<iData[]>(prisma, req, user);

    const { rows, columns } = prepareData(reportData);
    const buffer = await createExcel({
        rows,
        columns,
        sheetEditor: (sheet) => {
            sheet.columns[0].width = 15;
        },
    });
    return buffer as any;
};
