import { iDataTable } from '../../../../../Shared/Types/interfaces';

export const defaultGetInData = (item: iDataTable) => ({
    widthOut: undefined,
    countItemsOut: undefined,
    widthIn: item.widthOut,
    moneyIn: item.moneyOut,
    moneyOut: undefined,
    countItemsIn: item.countItemsOut,
});
