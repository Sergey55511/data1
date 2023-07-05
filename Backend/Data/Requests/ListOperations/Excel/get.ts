import { NextApiRequest } from 'next';
import { iData, iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import ExcelJS from 'exceljs';
import { getListOperations } from '../Get';
import { prepareData } from './prepareData';

export const getMoveOutExcelReport = async (
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
) => {
    const reportData = await getListOperations<iData[]>(prisma, req, user);

    const { rows, columns } = prepareData(reportData);

    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet('Отчет');
    sheet.addTable({
        name: 'MyTable',
        ref: 'A1',
        headerRow: true,
        totalsRow: true,
        style: {
            theme: 'TableStyleLight14',
            showRowStripes: true,
        },
        columns,
        rows,
    });

    sheet.columns[0].width = 15;

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as any;
};
