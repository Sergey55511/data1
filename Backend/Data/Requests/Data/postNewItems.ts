import moment from 'moment';
import type { NextApiRequest } from 'next';
import { iDataTable } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';
import { moveOutHoc } from '../../Link';

export const postNewItems = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = req.body.data as iDataTable[];
    const isSetNewPP = req.body.isSetNewPP;
    const isSetArticleId = req.body.isSetArticleId;
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
        date: item.date ? moment(item.date)?.toDate() : undefined,
        pp: pp ? pp : item.pp,
        articleId,
    }));

    const result: { count?: number; pp?: number; articleId?: number } =
        await prisma.data.createMany({
            data: dataPrepared,
        });

    result.pp = pp;
    result.articleId = articleId;

    const recipient = dataPrepared.find((item) => item.recipientId);

    if (recipient) {
        await moveOutHoc(prisma, recipient, dataPrepared, req);
    }

    return result as any;
};
