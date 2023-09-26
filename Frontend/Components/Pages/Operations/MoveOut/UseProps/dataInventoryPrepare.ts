import { iDataTable, iUser } from '../../../../../../Shared/Types/interfaces';
import { OPERATIONS, WORKPIECETYPE } from '../../../../../../Shared/constants';
import { getLosseObject, prepareDataTable } from '../../../../Helpers';
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

    const dataLosses: iDataTable[] = [];

    const dataIn = dataSend.map((item) => {
        if (item.widthOut != item.width || item.countItemsOut != item.count) {
            const widthIn = +(+(item.width ?? 0) - (item.widthOut ?? 0)).toFixed(2);
            const countItemsIn = Math.round(
                +(item.count ?? 0) - (item.countItemsOut ?? 0),
            );
            const cloneLosses = getLosseObject(
                { ...item },
                WORKPIECETYPE.losses.id,
                widthIn,
            );

            cloneLosses.widthIn = widthIn ?? undefined;
            cloneLosses.countItemsIn = countItemsIn;
            cloneLosses.countItemsOut = undefined;
            cloneLosses.moneyIn = undefined;
            cloneLosses.moneyOut = undefined;
            standardSettings(cloneLosses);
            dataLosses.push(prepareDataTable(cloneLosses));
        }

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

    return [...dataOut, ...dataIn, ...dataLosses];
};
