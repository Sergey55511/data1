import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { iDataTable } from '../../../../Shared/Types/interfaces';

export const mixing = async <T>(data: iDataTable[], isSetNewPP = true): Promise<T> => {
    const prisma = new PrismaClient();
    let pp: number;
    if (isSetNewPP) {
        const queryMaxPP = await prisma.$queryRaw`SELECT max(pp) as maxpp FROM "Data";`;
        pp = Array.isArray(queryMaxPP) ? queryMaxPP[0]?.maxpp : 0;
        pp++;
    }
    const dataPrepared = data?.map((item) => ({
        ...item,
        date: moment()?.toDate(),
        pp: pp,
    }));
    const dataCom = dataPrepared?.map((item) => ({
        ...item,
        productionId: undefined,
        widthOut: undefined,
        countItemsOut: undefined,
        widthIn: item.widthOut,
        countItemsIn: item.countItemsOut,
    }));

    await prisma.data.createMany({
        data: dataPrepared,
    });

    return (await prisma.data.createMany({
        data: dataCom,
    })) as any;
};
