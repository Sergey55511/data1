import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { iData } from '../../../../Shared/Types/interfaces';

export const changeNumProduction = async <T>(data: iData[]): Promise<T> => {
    const prisma = new PrismaClient();

    const tmpData = (item: iData) => ({
        ...item,
        date: moment(item.date)?.toDate(),
        operationId: 38,
        pp: undefined,
        managerId: item.userId,
    });

    const dateOut = data?.map(tmpData);
    const dateIn = data?.map((item) => ({
        ...tmpData(item),
        widthOut: undefined,
        countItemsOut: undefined,
        widthIn: item.widthOut,
        countItemsIn: item.countItemsOut,
    }));

    await prisma.data.createMany({
        data: dateOut,
    });

    return (await prisma.data.createMany({
        data: dateIn,
    })) as any;
};
