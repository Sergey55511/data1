import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const orders = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.$queryRaw`
        SELECT 
            pp,
			"userId",
			u."login" as "userLogin",
			"managerId",
			m."name" as "managerLogin",
			"operationId",
			"operation",
			"workpieceTypeId",
            "workpieceType",
            "modelId",
			"model",
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
            "widthOut",
            COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0) as "width",
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0) as "count",
            COALESCE(sum("moneyIn"),0)-COALESCE(sum("moneyOut"),0) as "code"
        FROM 
            public."Data" left join "WorkpieceType" on "Data"."workpieceTypeId"="WorkpieceType".id
            left join "Fraction" on "Data"."fractionId"="Fraction".id
            left join "MaterialGroup" on "Data"."materialGroupId"="MaterialGroup".id
			left join "Grade" on "Data"."gradeId"="Grade".id
			left join "Models" on "Data"."modelId"="Models".id
			left join "Color" on "Data"."colorId"="Color".id
			left join "Length" on "Data"."lengthId"="Length".id
			left join "Channel" on "Data"."channelId"="Channel".id
			left join "Managers" m on "Data"."managerId"=m.id
			left join "Users" u on "Data"."userId"=u.id
			left join "Operations" on "Data"."operationId"="Operations".id
            left join "State" on "Data"."stateId"="State".id
        WHERE "Data"."pp" in 
			(
				select pp 
				from "Data" 
				where "Data"."storeId"=${+storeId} and pp is not null
				group by pp
				having 
					COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)<>0 or
        			COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0)<>0
			)
        GROUP BY 
			pp,
			"userId",
			u."login",
			"managerId",
			m."name",
			"operationId",
			"operation",
            "workpieceTypeId",
            "workpieceType",
			"modelId",
            "model",
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
            lot,
            "widthOut"
        HAVING pp is not null and 
		COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)<>0 or
        COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0)<>0;
    `;
};
