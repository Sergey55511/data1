import moment from 'moment';
import { OPERATIONS } from '../../../../Shared/constants';
import { iDataTable } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const changeNumProduction = async <T>(
    prisma: tPrisma,
    data: iDataTable[],
): Promise<T> => {
    const tmpData = (item: iDataTable) => ({
        ...item,
        date: moment(item.date)?.toDate(),
        operationId: OPERATIONS.changeProduction.id,
        pp: undefined,
        task: undefined,
        productionId: undefined,
    });

    const dateOut = data?.map(tmpData);
    const dateIn = data?.map((item) => ({
        ...tmpData(item),
        task: undefined,
        widthIn: item.widthOut,
        widthOut: undefined,
        moneyIn: item.moneyOut,
        moneyOut: undefined,
        countItemsOut: undefined,
        countItemsIn: item.countItemsOut,
        productionId: item.productionId,
    }));

    await prisma.data.createMany({
        data: dateOut,
    });

    return (await prisma.data.createMany({
        data: dateIn,
    })) as any;
};
