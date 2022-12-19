import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';

export const leftovers = <T>(prisma: tPrisma, storeId: number): PrismaPromise<T> => {
    return prisma.$queryRaw`
      SELECT 
            "Data"."workpieceTypeId",
            "workpieceType",
            "typeId",
            type,
            "sizeRangeId",
            "sizeRange",
			"productionId",
			"Productions".description as "production",
            "fullModelId",
			(
				SELECT  
					concat("workpieceType",'_',"model",'_',"profile",'_',"sizeRange",'_',"length") as "fullModel"
				FROM public."FullModels"
					LEFT JOIN "WorkpieceType" ON "WorkpieceType".id = "FullModels"."workpieceTypeId"
					LEFT JOIN "Models" ON "Models".id = "FullModels"."modelId"
					LEFT JOIN "Profile" ON "Profile".id = "FullModels"."profileId"
					LEFT JOIN "SizeRangeModel" ON "SizeRangeModel".id = "FullModels"."sizeRangeModelId"
					LEFT JOIN "LengthModel" ON "LengthModel".id = "FullModels"."lengthModelId"
				WHERE "FullModels".id="fullModelId"
			),
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
		WHERE "Data"."storeId"=${+storeId} AND "WorkpieceType"."isShow"=true
        GROUP BY 
            "Data"."workpieceTypeId",
            "workpieceType",
            "typeId",
            type,
            "sizeRangeId",
            "sizeRange",
			"productionId",
			"Productions".description,
			"fullModelId",
			(
				SELECT  
					concat("workpieceType",'_',"model",'_',"profile",'_',"sizeRange",'_',"length") as "fullModel"
				FROM public."FullModels"
					LEFT JOIN "WorkpieceType" ON "WorkpieceType".id = "FullModels"."workpieceTypeId"
					LEFT JOIN "Models" ON "Models".id = "FullModels"."modelId"
					LEFT JOIN "Profile" ON "Profile".id = "FullModels"."profileId"
					LEFT JOIN "SizeRangeModel" ON "SizeRangeModel".id = "FullModels"."sizeRangeModelId"
					LEFT JOIN "LengthModel" ON "LengthModel".id = "FullModels"."lengthModelId"
				WHERE "FullModels".id="fullModelId"
			),
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
    `;
};
