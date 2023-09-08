import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next/types';
import { iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';
import { fullModelSQL } from '../../constants';
import { dal } from './Dal';

export const leftoversBijouterie = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): PrismaPromise<T> => {
    const storeId = user.storeId;
    const data = dal(req.query);

    return prisma.$queryRawUnsafe(
        `
      SELECT 
            "Data"."workpieceTypeId",
            "workpieceType",
            "typeId",
            type,
            "sizeRangeId",
            "sizeRange",
            "SizeRange".size,
			"productionId",
			"Productions".description as "production",
            "fullModelId",
			${fullModelSQL},
            "fractionId",
            "fraction",
			"colorId",
            "color",
			"lengthId",
            length,
            "channelId",
			"channel",
			"gradeId",
			"grade",
            "materialGroupId",
            "materialGroup",
            "stateId",
            state,
            lot,
            COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0) as "width",
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0) as "count",
            COALESCE(sum("moneyIn")::numeric,0)-COALESCE(sum("moneyOut")::numeric,0) as "code"
        FROM 
            public."Data" left join "WorkpieceType" on "Data"."workpieceTypeId"="WorkpieceType".id
            left join "Fraction" on "Data"."fractionId"="Fraction".id
            left join "MaterialGroup" on "Data"."materialGroupId"="MaterialGroup".id
			left join "Grade" on "Data"."gradeId"="Grade".id
			left join "FullModels" on "Data"."fullModelId"="FullModels".id
			left join "Color" on "Data"."colorId"="Color".id
			left join "Length" on "Data"."lengthId"="Length".id
			left join "Channel" on "Data"."channelId"="Channel".id
			left join "Productions" on "Data"."productionId"="Productions".id
            left join "State" on "Data"."stateId"="State".id
            left join "Types" on "Data"."typeId"="Types".id
            left join "SizeRange" on "Data"."sizeRangeId"="SizeRange".id
		WHERE "Data"."storeId"=$1 
            AND "WorkpieceType"."isShow"=true 
            AND "Data"."workpieceTypeId"=$2
            AND "Data"."sizeRangeId"=$3
            AND "Data"."colorId"=$4
        GROUP BY 
            "Data"."workpieceTypeId",
            "workpieceType",
            "typeId",
            type,
            "sizeRangeId",
            "sizeRange",
            "SizeRange".size,
			"productionId",
			"Productions".description,
			"fullModelId",
			${fullModelSQL},
            "fractionId",
            "fraction",
            "colorId",
            "color",
            "lengthId",
            length,
            "channelId",
			channel,
			"gradeId",
			"grade",
            "materialGroupId",
            "materialGroup",
            "stateId",
            state,
            lot
        HAVING COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)>0;
    `,
        storeId,
        data.workpieceTypeId,
        data.sizeRangeId,
        data.colorId,
    );
};
