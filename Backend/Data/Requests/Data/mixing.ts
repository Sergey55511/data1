import moment from 'moment';
import { GRADE } from '../../../../Shared/constants';
import { iDataTable } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const mixing = async <T>(
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
        date: moment()?.toDate(),
        pp: pp,
    }));
    const dataCom = dataPrepared?.map((item) => ({
        ...item,
        productionId: undefined,
        gradeId: GRADE.mix.id,
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
