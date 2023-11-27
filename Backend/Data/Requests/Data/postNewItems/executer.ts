import moment from 'moment';
import { iCookiesAuth, iDataTable } from '../../../../../Shared/Types/interfaces';
import { moveOutHoc } from '../../../Link';
import prisma from '../../../Services/prisma';
import { entarSemaphore } from '../../../Services/Semaphore/enterSemaphore';

export interface iData {
    data: iDataTable[];
    isSetNewPP?: boolean;
    isSetArticleId?: boolean;
    qookies: iCookiesAuth;
}

entarSemaphore(async ({ data, isSetNewPP, isSetArticleId, qookies }: iData) => {
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
        await moveOutHoc(prisma, recipient, dataPrepared, qookies);
    }

    return result;
});

export const executerPaht = __filename;
