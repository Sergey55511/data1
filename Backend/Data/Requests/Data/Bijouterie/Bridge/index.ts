import { NextApiRequest } from 'next';
import { STORES } from '../../../../../../Shared/constants';
import { iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';
import { fullModelSQL, getfullModelSQL } from '../../constants';
import { dal } from './Dal';

export const getBijouterieBridge = (
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
) => {
    if (user.storeId != STORES.Moscow.id) return [] as any;
    const data = dal(req.query);
    return prisma.$queryRawUnsafe(
        `
    SELECT 
        "BijouterieBridge".id,
        "BijouterieBridge"."bijouterieArticlesId",
        "BijouterieArticles".article as "bijouterieArticle",
        "BijouterieBridge"."workpieceTypeId",
        "WorkpieceType"."workpieceType",
        "BijouterieBridge"."sizeRangeId",
        "SizeRange"."sizeRange",
        "BijouterieBridge"."colorId",
        "Color".color,
        "BijouterieBridge"."locksId",
        "Locks".material as "lockMaterial",
        "Locks".color as "lockColor",
        "Locks".size as "lockSize",
        "Locks"."type" as "lockType",
        "BijouterieBridge"."yarnsAssembleId",
        "YarnsAssemble"."yarnAssemble",
        "YarnsAssemble"."width" as "yarnAssembleWidth",
        "BijouterieBridge"."channelId",
        "Channel".channel,
        "BijouterieBridge"."fullModelsId",
        ${getfullModelSQL('fullModelsId')},
        "BijouterieBridge"."gradeId",
        "Grade".grade,
        "BijouterieBridge"."stateId",
        "State".state,
        "BijouterieBridge"."typesId",
        "Types"."type",
        (
            SELECT COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)
            FROM  "Data"
            WHERE 
                "Data"."workpieceTypeId"="BijouterieBridge"."workpieceTypeId" AND
                "Data"."sizeRangeId"="BijouterieBridge"."sizeRangeId" AND
                "Data"."colorId"="BijouterieBridge"."colorId" AND
                "Data"."channelId"="BijouterieBridge"."channelId" AND
                "Data"."fullModelId"="BijouterieBridge"."fullModelsId" AND
                "Data"."gradeId"="BijouterieBridge"."gradeId" AND
                "Data"."stateId"="BijouterieBridge"."stateId" AND
                "Data"."typeId"="BijouterieBridge"."typesId"
        ) as "width",
        (
            SELECT COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0)
            FROM  "Data"
            WHERE 
                "Data"."workpieceTypeId"="BijouterieBridge"."workpieceTypeId" AND
                "Data"."sizeRangeId"="BijouterieBridge"."sizeRangeId" AND
                "Data"."colorId"="BijouterieBridge"."colorId" AND
                "Data"."channelId"="BijouterieBridge"."channelId" AND
                "Data"."fullModelId"="BijouterieBridge"."fullModelsId" AND
                "Data"."gradeId"="BijouterieBridge"."gradeId" AND
                "Data"."stateId"="BijouterieBridge"."stateId" AND
                "Data"."typeId"="BijouterieBridge"."typesId"
        ) as "count",
        (
            SELECT COALESCE(sum("moneyIn")::numeric,0)-COALESCE(sum("moneyOut")::numeric,0)
            FROM  "Data" 			
            WHERE 
                "Data"."workpieceTypeId"="BijouterieBridge"."workpieceTypeId" AND
                "Data"."sizeRangeId"="BijouterieBridge"."sizeRangeId" AND
                "Data"."colorId"="BijouterieBridge"."colorId" AND
                "Data"."channelId"="BijouterieBridge"."channelId" AND
                "Data"."fullModelId"="BijouterieBridge"."fullModelsId" AND
                "Data"."gradeId"="BijouterieBridge"."gradeId" AND
                "Data"."stateId"="BijouterieBridge"."stateId" AND
                "Data"."typeId"="BijouterieBridge"."typesId"
        ) as "code"
    FROM public."BijouterieBridge"
        LEFT JOIN "WorkpieceType" ON
            "WorkpieceType".id="BijouterieBridge"."workpieceTypeId"
        LEFT JOIN "SizeRange" ON
            "SizeRange".id="BijouterieBridge"."sizeRangeId"
        LEFT JOIN "Color" ON
            "Color".id="BijouterieBridge"."colorId"
        LEFT JOIN "Channel" ON
            "Channel".id="BijouterieBridge"."channelId"
        LEFT JOIN "FullModels" ON
            "FullModels".id="BijouterieBridge"."fullModelsId"
        LEFT JOIN "Grade" ON
            "Grade".id="BijouterieBridge"."gradeId"
        LEFT JOIN "State" ON
            "State".id="BijouterieBridge"."stateId"
        LEFT JOIN "Types" ON
            "Types".id="BijouterieBridge"."typesId"
        LEFT JOIN "BijouterieArticles" ON
            "BijouterieArticles".id="BijouterieBridge"."bijouterieArticlesId"
        LEFT JOIN "Locks" ON
            "Locks".id="BijouterieBridge"."locksId"
        LEFT JOIN "YarnsAssemble" ON
            "YarnsAssemble".id="BijouterieBridge"."yarnsAssembleId"
    WHERE "BijouterieBridge"."bijouterieArticlesId"=$1
    `,
        data.articleId,
    ) as any;
};
