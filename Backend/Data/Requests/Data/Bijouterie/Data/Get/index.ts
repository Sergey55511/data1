import { NextApiRequest } from 'next';
import { iUser } from '../../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../../types';

export const getDataBijouterie = (prisma: tPrisma, req: NextApiRequest, user: iUser) => {
    return prisma.$queryRaw`
        SELECT
            min(public."DataBijouterie".date) as date,
            "bijouterieArticleId",
            "BijouterieArticles".length,
            "BijouterieArticles"."typeAssemble",
            "BijouterieArticles".variant,
            "ResultsAssemble".id,
            "ResultsAssemble"."resultAssemble",
            COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0) as "width",
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0) as "count",
            COALESCE(sum("moneyIn")::numeric,0)-COALESCE(sum("moneyOut")::numeric,0) as "code"
        FROM public."DataBijouterie" 
            LEFT JOIN public."BijouterieArticles" 
                ON "BijouterieArticles".id = "DataBijouterie"."bijouterieArticleId"
            LEFT JOIN public."ResultsAssemble" 
                ON "ResultsAssemble".id = "BijouterieArticles"."resultsAssembleId"
        WHERE "storeId"=${user.storeId} and "DataBijouterie".active=true	
        GROUP BY
            "bijouterieArticleId",
            "BijouterieArticles".length,
            "BijouterieArticles"."typeAssemble",
            "BijouterieArticles".variant,
            "ResultsAssemble".id,
            "ResultsAssemble"."resultAssemble";` as any;
};
