import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { OPERATIONS } from '../../../../Shared/constants';
import { iDataTable } from '../../../../Shared/Types/interfaces';

export const changeNumProduction = async <T>(data: iDataTable[]): Promise<T> => {
    const prisma = new PrismaClient();

    const tmpData = (item: iDataTable) => ({
        ...item,
        date: moment(item.date)?.toDate(),
        operationId: OPERATIONS.changeProduction.id,
        pp: undefined,
        managerId: item.userId,
        productionId: undefined,
    });

    const dateOut = data?.map(tmpData);
    const dateIn = data?.map((item) => ({
        ...tmpData(item),
        widthOut: undefined,
        countItemsOut: undefined,
        widthIn: item.widthOut,
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
