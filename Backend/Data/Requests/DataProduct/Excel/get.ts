import { NextApiRequest } from 'next';
import { iDataProduct, iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { getDataProduct } from '../Get';
import { prepareData } from './prepareData';
import { createExcel } from '../../../../Helpers/createExcel';

export const getDataProductExcel = async (
    prisma: tPrisma,
    _req: NextApiRequest,
    user: iUser,
) => {
    const reportData = await getDataProduct<iDataProduct[]>(prisma, user);

    const { rows, columns } = prepareData(reportData);
    const buffer = await createExcel({
        rows,
        columns,
        sheetEditor: (sheet) => {
            sheet.columns[0].width = 15;
            sheet.columns[1].width = 20;
            sheet.columns[3].width = 20;
            sheet.columns[7].width = 15;
            sheet.columns[8].width = 15;
            sheet.columns[10].width = 20;
        },
    });
    return buffer as any;
};
