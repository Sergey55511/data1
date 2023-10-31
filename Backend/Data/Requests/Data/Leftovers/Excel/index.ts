import { leftovers } from '..';
import { iData, iUser } from '../../../../../../Shared/Types/interfaces';
import { createExcel } from '../../../../../Helpers/createExcel';
import { tPrisma } from '../../../../../types';
import { prepareData } from './prepareData';

export const leftoversExcel = async (prisma: tPrisma, user: iUser) => {
    const dataLeftovers = await leftovers<iData[]>(prisma, user);
    const { rows, columns } = prepareData(dataLeftovers);
    const buffer = await createExcel({
        rows,
        columns,
        sheetEditor: (sheet) => {
            sheet.columns[0].width = 15;
            sheet.columns[1].width = 23;
            sheet.columns[2].width = 15;
            sheet.columns[3].width = 11;
            sheet.columns[4].width = 36;
            sheet.columns[5].width = 11;
            sheet.columns[6].width = 17;
            sheet.columns[7].width = 15;
            sheet.columns[8].width = 7;
            sheet.columns[9].width = 6;
            sheet.columns[10].width = 11;
            sheet.columns[11].width = 13;
            sheet.columns[12].width = 13;
        },
    });
    return buffer as any;
};
