import moment from 'moment';
import { iDataTable } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const postNewItems = async <T>(
    prisma: tPrisma,
    data: iDataTable[],
    isSetNewPP = true,
    isSetArticleId = false,
): Promise<T> => {
    let pp: number | undefined;
    let articleId: number | undefined;
    if (isSetNewPP) {
        const queryMaxPP = await prisma.$queryRaw`SELECT max(pp) as maxpp FROM "Data";`;
        pp = Array.isArray(queryMaxPP) ? queryMaxPP[0]?.maxpp : 0;
        pp!++;
    }

    if (isSetArticleId) {
        const queryMaxArticleId =
            await prisma.$queryRaw`SELECT max("articleId") as articleid FROM "Data";`;
        articleId = Array.isArray(queryMaxArticleId)
            ? queryMaxArticleId[0]?.articleid
            : 0;
        articleId!++;
    }
    const dataPrepared = data?.map((item) => ({
        ...item,
        date: moment(item.date)?.toDate(),
        pp: pp ? pp : item.pp,
        articleId,
    }));

    const result: { count?: number; pp?: number; articleId?: number } =
        await prisma.data.createMany({
            data: dataPrepared,
        });
    result.pp = pp;
    result.articleId = articleId;

    return result as any;
};
