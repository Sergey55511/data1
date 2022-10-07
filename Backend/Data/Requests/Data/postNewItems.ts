import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { iDataTable } from '../../../../Shared/Types/interfaces';

export const postNewItems = async <T>(
    data: iDataTable[],
    isSetNewPP = true,
): Promise<T> => {
    const prisma = new PrismaClient();
    let pp: number;
    if (isSetNewPP) {
        const queryMaxPP = await prisma.$queryRaw`SELECT max(pp) as maxpp FROM "Data";`;
        pp = Array.isArray(queryMaxPP) ? queryMaxPP[0]?.maxpp : 0;
        pp++;
    }
    const datePrepared = data?.map((item) => ({
        ...item,
        date: moment(item.date)?.toDate(),
        pp: pp,
    }));
    
    console.log('datePrepared', datePrepared);

    return (await prisma.data.createMany({
        data: datePrepared,
    })) as any;
};