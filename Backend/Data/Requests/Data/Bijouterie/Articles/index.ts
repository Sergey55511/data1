import { STORES } from '../../../../../../Shared/constants';
import { iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';

export const getBijouterieArticles = (prisma: tPrisma, user: iUser) => {
    if (user.storeId != STORES.Moscow.id) return [] as any;
    return prisma.$queryRaw`
    SELECT 
        "BijouterieArticles".id,
        article,
        "resultsAssembleId",
        "ResultsAssemble"."resultAssemble",
        variant,
        length,
        "typeAssemble"
    FROM public."BijouterieArticles"
    LEFT JOIN "ResultsAssemble" 
        ON "ResultsAssemble".id = "resultsAssembleId";
    ` as any;
};
