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
    const calculationRequest = (
        firstField: string,
        seccondField: string,
        name: string,
    ) => `
    (
        SELECT COALESCE(round(sum("${firstField}")::numeric,2),0)-COALESCE(round(coalesce(sum("${seccondField}"),0)::numeric,2),0)
        FROM  "Data"
        WHERE 
            COALESCE("Data"."workpieceTypeId",0)=COALESCE("BijouterieBridge"."workpieceTypeId",0) AND
            COALESCE("Data"."sizeRangeId",0)=COALESCE("BijouterieBridge"."sizeRangeId",0) AND
            COALESCE("Data"."colorId",0)=COALESCE("BijouterieBridge"."colorId",0) AND
            COALESCE("Data"."channelId",0)=COALESCE("BijouterieBridge"."channelId",0) AND
            COALESCE("Data"."fullModelId",0)=COALESCE("BijouterieBridge"."fullModelsId",0) AND
            COALESCE("Data"."gradeId",0)=COALESCE("BijouterieBridge"."gradeId",0) AND
            COALESCE("Data"."stateId",0)=COALESCE("BijouterieBridge"."stateId",0) AND
            COALESCE("Data"."typeId",0)=COALESCE("BijouterieBridge"."typesId",0)
    ) as "${name}"
    `;
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
        ${calculationRequest('widthIn', 'widthOut', 'width')},
        ${calculationRequest('countItemsIn', 'countItemsOut', 'count')},
        ${calculationRequest('moneyIn', 'moneyOut', 'code')}
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
