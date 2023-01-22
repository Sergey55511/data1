import moment from 'moment';
import { MyError } from '../../../../../Shared/Classes/error';
import { iDataTable, iSizeRange } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { defaultGetInData } from './utils';

export const mixingSize = async <T>(
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
    const sizeRange = (await prisma.sizeRange.findMany({
        select: {
            id: true,
            sizeRange: true,
            nextSizeRangeId: true,
        },
        where: {
            active: true,
        },
        orderBy: { position: 'asc' },
    })) as iSizeRange[];

    const dataPrepared = data?.map((item) => ({
        ...item,
        date: moment()?.toDate(),
        pp: pp,
    }));

    const dataCom = dataPrepared?.map((item) => {
        const newSizeRange = sizeRange.find((size) => size.id == item.sizeRangeId);

        const nextSizeRangeId = newSizeRange?.nextSizeRangeId;

        if (!nextSizeRangeId)
            throw new MyError(400, 'Не удалось найти следующий размер!');

        return {
            ...item,
            sizeRangeId: nextSizeRangeId,
            ...defaultGetInData(item),
        };
    });

    await prisma.data.createMany({
        data: dataPrepared,
    });

    return (await prisma.data.createMany({
        data: dataCom,
    })) as any;
};
