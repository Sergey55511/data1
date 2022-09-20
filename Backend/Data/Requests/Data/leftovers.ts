import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const leftovers = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.$queryRaw`
        SELECT 
            "workpieceType",
            model,
            "sizeRange",
            "colorType",
            length,
            channel,
			"grade",
            "materialGroup",
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
		WHERE "Data"."storeId"=${+storeId}
        GROUP BY 
            "workpieceType",
            model,
            "sizeRange",
            "colorType",
            length,
            channel,
			"grade",
            "materialGroup",
            state,
            lot,
            "productionId"
        HAVING round(sum("widthIn")::numeric,2)-round(coalesce(sum("widthOut"),0)::numeric,2)>0;
    `;
};
