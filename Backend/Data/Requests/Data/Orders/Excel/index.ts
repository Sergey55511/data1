import { orders } from '..';
import { STORES } from '../../../../../../Shared/constants';
import { iData, iUser } from '../../../../../../Shared/Types/interfaces';
import { createExcel } from '../../../../../Helpers/createExcel';
import { tPrisma } from '../../../../../types';
import { prepareData } from './prepareData';
import { sheetEditor } from './sheetEditor';
import { Worksheet } from 'exceljs';

export const ordersExcel = async (prisma: tPrisma, user: iUser) => {
    const dataOrders = await orders<iData[]>(prisma, user);
    const isMSC = user.storeId == STORES.Moscow.id;
    const { rows, columns } = prepareData(dataOrders, isMSC);
    const buffer = await createExcel({
        rows,
        columns,
        sheetEditor: (sheet: Worksheet) => sheetEditor(sheet, isMSC),
    });
    return buffer as any;
};
