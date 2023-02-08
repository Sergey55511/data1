import { iUser } from '../../../../../../Shared/Types/interfaces';
import { OPERATIONS } from '../../../../../../Shared/constants';
import { prepareDataTable } from '../../../../Helpers';
import { iDataIndex } from '.';

export const dataInventoryPrepare = (dataSend: iDataIndex[], user: iUser) => {
    const getValue = (v: any) => (v ? +v : undefined);
    const standardSettings = (item: iDataIndex) => {
        item.numDocument = undefined;
        item.recipientId = undefined;
        item.operationId = OPERATIONS.inventory.id;
        item.userId = user.id;
        item.storeId = user.storeId;
    };
    const dataOut = dataSend.map((item) => {
        const clone = { ...item };
        clone.widthIn = undefined;
        clone.widthOut = getValue(item.width);
        clone.countItemsIn = undefined;
        clone.countItemsOut = getValue(item.count);
        clone.moneyIn = undefined;
        clone.moneyOut = getValue(item.code);
        standardSettings(clone);
        return prepareDataTable(clone);
    });

    const dataIn = dataSend.map((item) => {
        const clone = { ...item };
        clone.widthIn = getValue(item.widthOut);
        clone.widthOut = undefined;
        clone.countItemsIn = getValue(item.countItemsOut);
        clone.countItemsOut = undefined;
        clone.moneyIn = getValue(item.code);
        clone.moneyOut = undefined;

        standardSettings(clone);
        return prepareDataTable(clone);
    });

    return [...dataOut, ...dataIn];
};
