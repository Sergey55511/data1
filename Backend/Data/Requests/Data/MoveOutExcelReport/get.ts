import { NextApiRequest } from 'next';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import ExcelJS from 'exceljs';

export const getMoveOutExcelReport = async (
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
) => {
    const workbook = new ExcelJS.Workbook();
    workbook.title = 'hello';
    const sheet = workbook.addWorksheet('Отчет');
    sheet.addTable({
        name: 'MyTable',
        ref: 'A1',
        headerRow: true,
        totalsRow: true,
        style: {
            theme: 'TableStyleDark3',
            showRowStripes: true,
        },
        columns: [
            { name: 'Date', totalsRowLabel: 'Totals:', filterButton: true },
            { name: 'Amount', totalsRowFunction: 'sum', filterButton: false },
        ],
        rows: [
            [new Date('2019-07-20'), 70.1],
            [new Date('2019-07-21'), 70.6],
            [new Date('2019-07-22'), 70.1],
        ],
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as any;
};
