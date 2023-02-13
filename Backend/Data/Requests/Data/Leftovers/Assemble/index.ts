import { WORKPIECETYPE } from '../../../../../../Shared/constants';
import { iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';
import { fullModelSQL } from '../../constants';

export const getLeftoversAssemble = (prisma: tPrisma, user: iUser) => {
    const storeId = user.storeId;
    return prisma.$queryRawUnsafe(`SELECT 
            "Data"."workpieceTypeId",
            "workpieceType",
			"fullModelId",
			${fullModelSQL},
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
			"stateId",
            state,
			lot,
			"productionId",
			"Productions".description as "production",
			COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0) as "width",
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0) as "count",
            COALESCE(sum("moneyIn")::numeric,0)-COALESCE(sum("moneyOut")::numeric,0) as "code"
        FROM 
            public."Data" left join "WorkpieceType" on "Data"."workpieceTypeId"="WorkpieceType".id
			left join "Grade" on "Data"."gradeId"="Grade".id
			left join "FullModels" on "Data"."fullModelId"="FullModels".id
			left join "Color" on "Data"."colorId"="Color".id
			left join "Length" on "Data"."lengthId"="Length".id
			left join "Channel" on "Data"."channelId"="Channel".id
			left join "Productions" on "Data"."productionId"="Productions".id
            left join "State" on "Data"."stateId"="State".id
            left join "SizeRange" on "Data"."sizeRangeId"="SizeRange".id
		WHERE "Data"."storeId"=${+storeId} AND "WorkpieceType"."isShow"=true and "stateId" in (30, 32, 36) and "Data"."workpieceTypeId" != ${
        WORKPIECETYPE.prunes.id
    }
        GROUP BY 
            "Data"."workpieceTypeId",
            "workpieceType",
			"fullModelId",
			${fullModelSQL},
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
			"stateId",
            state,
			lot,
			"productionId",
			"Productions".description
        HAVING COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)>0;`) as any;
};
