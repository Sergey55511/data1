import { isMainThread, workerData, parentPort } from 'worker_threads';
import { BinarySemaphore } from '../../../Services/Semaphore/binarySemaphore';
import moment from 'moment';
import { iDataTable } from '../../../../../Shared/Types/interfaces';
import { moveOutHoc } from '../../../Link';
import prisma from '../../../Services/prisma';

if (!isMainThread) {
    const semaphore = new BinarySemaphore(workerData.sharedArrayBuffer);

    semaphore.exec(async () => {
        const data = workerData.data.data as iDataTable[];
        const isSetNewPP = workerData.data.isSetNewPP;
        const isSetArticleId = workerData.data.isSetArticleId;
        const qookies = workerData.data.qookies;
        let pp: number | undefined;
        let articleId: number | undefined;

        if (isSetNewPP) {
            const queryMaxPP =
                await prisma.$queryRaw`SELECT max(pp) as maxpp FROM "Data";`;
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

        parentPort?.postMessage(result);
    });
}

export const executerPaht = __filename;
