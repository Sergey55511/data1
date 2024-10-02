import { PrismaPromise } from '@prisma/client';
import { OPERATIONS } from '../../../../../Shared/constants';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { fullModelSQL, fullModelSQLTask } from '../constants';

export const orders = <T>(prisma: tPrisma, user: iUser): PrismaPromise<T> => {
    const storeId = user.storeId;
    return prisma.$queryRawUnsafe(`
        WITH "DataP" as (
            SELECT
                pp,
                "storeId",
                "widthIn",
                "widthOut"
            FROM "Data"
            WHERE active=true and optimized=false
        
            UNION ALL
        
            SELECT
                pp,
                "storeId",
                "widthIn",
                "widthOut"
            FROM "OptimizedData"
        )
        SELECT 
            min(public."Data".date) as date,
            pp,
            "productionId",
			"userId",
			u."login" as "userLogin",
			"managerId",
			m."name" as "managerLogin",
            "typeId",
            type,
            "sizeRangeId",
            "sizeRange",
			"operationId",
			"operation",
			"workpieceTypeId",
            "workpieceType",
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
            task,
            ${fullModelSQLTask},
            "widthOut",
            ABS(COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)) as "width",
            ABS(COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0)) as "count",
            COALESCE(sum("moneyIn"),0)-COALESCE(sum("moneyOut"),0) as "code"
        FROM 
            public."Data" left join "WorkpieceType" on "Data"."workpieceTypeId"="WorkpieceType".id
            left join "Fraction" on "Data"."fractionId"="Fraction".id
            left join "MaterialGroup" on "Data"."materialGroupId"="MaterialGroup".id
			left join "Grade" on "Data"."gradeId"="Grade".id
			left join "Color" on "Data"."colorId"="Color".id
			left join "Length" on "Data"."lengthId"="Length".id
			left join "Channel" on "Data"."channelId"="Channel".id
			left join "Managers" m on "Data"."managerId"=m.id
			left join "Users" u on "Data"."userId"=u.id
			left join "Operations" on "Data"."operationId"="Operations".id
            left join "State" on "Data"."stateId"="State".id
            left join "Types" on "Data"."typeId"="Types".id
            left join "SizeRange" on "Data"."sizeRangeId"="SizeRange".id
        WHERE "Data"."pp" in 
			(
				select pp 
				from "DataP" 
				where "DataP"."storeId"=${+storeId} and pp is not null
				group by pp
				having 
					COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(sum("widthOut")::numeric,2),0)<>0
			) 
            and "operationId" <> ${+OPERATIONS.assemble.id} 
            and "operationId" <> ${+OPERATIONS.getOut.id}
            and "operationId" <> ${+OPERATIONS.assembleBijouterie.id}
        GROUP BY 
			pp,
            "productionId",
			"userId",
			u."login",
			"managerId",
			m."name",
            "typeId",
            type,
            "sizeRangeId",
            "sizeRange",
			"operationId",
			"operation",
            "workpieceTypeId",
            "workpieceType",
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
            lot,
            task,
            ${fullModelSQLTask},
            "widthOut"
        HAVING 
            pp is not null 
                and 
		    COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)<>0;
    `);
};
