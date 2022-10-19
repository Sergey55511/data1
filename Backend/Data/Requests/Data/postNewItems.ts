import moment from 'moment';
import { iDataTable } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const postNewItems = async <T>(
    prisma: tPrisma,
    data: iDataTable[],
    isSetNewPP = true,
): Promise<T> => {
    let pp: number;
    if (isSetNewPP) {
        const queryMaxPP = await prisma.$queryRaw`SELECT max(pp) as maxpp FROM "Data";`;
        pp = Array.isArray(queryMaxPP) ? queryMaxPP[0]?.maxpp : 0;
        pp++;
    }
    const dataPrepared = data?.map((item) => ({
        ...item,
        date: moment(item.date)?.toDate(),
        pp: pp,
    }));

    return (await prisma.data.createMany({
        data: dataPrepared,
    })) as any;
};
