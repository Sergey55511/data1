import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const leftovers = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.$queryRaw`
        SELECT 
            "workpieceTypeId",
            "workpieceType",
            "modelId",
			"model",
            "sizeRangeId",
            "sizeRange",
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
            "productionId",
            round(sum("widthIn")::numeric,2)-round(coalesce(sum("widthOut"),0)::numeric,2) as "width",
            round(sum("countItemsIn")::numeric,2)-round(sum("countItemsOut")::numeric,2) as "count",
            sum("moneyIn")-sum("moneyOut") as "code"
        FROM 
            public."Data" left join "WorkpieceType" on "Data"."workpieceTypeId"="WorkpieceType".id
            left join "SizeRange" on "Data"."sizeRangeId"="SizeRange".id
            left join "MaterialGroup" on "Data"."materialGroupId"="MaterialGroup".id
			left join "Grade" on "Data"."gradeId"="Grade".id
			left join "Models" on "Data"."modelId"="Models".id
			left join "Color" on "Data"."colorId"="Color".id
			left join "Length" on "Data"."lengthId"="Length".id
			left join "Channel" on "Data"."channelId"="Channel".id
		WHERE "Data"."storeId"=2
        GROUP BY 
            "workpieceTypeId",
            "workpieceType",
			"modelId",
            "model",
            "sizeRangeId",
            "sizeRange",
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
            lot,
            "productionId"
        HAVING round(sum("widthIn")::numeric,2)-round(coalesce(sum("widthOut"),0)::numeric,2)>0;
    `;
};
