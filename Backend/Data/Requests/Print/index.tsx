import type { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const PrintBlank = (prisma: tPrisma, user: iUser, req: NextApiRequest) => {
    const data = dal(req.query);
    const storeId = +user.storeId;
    return prisma.$queryRawUnsafe(`
    SELECT 
        "Data".id,
        "Data"."operationId",
        "Data"."workpieceTypeId",
		"Data"."channelId",
		"Channel".channel,
		"Data"."typeId",
		"Types"."type",
        "WorkpieceType"."workpieceType",
        "SizeRange"."sizeRange",
        "Length".length,
        "Data"."fullModelId",
        "Data"."task",
        "Models".model,
        "Profile".profile,
        "SizeRangeM"."sizeRange" as "sizeRangeModel",
        "LengthModel".length as "lengthModel",
        "Data"."widthOut"
    FROM public."Data" LEFT JOIN "WorkpieceType" 
            on "WorkpieceType".id = "Data"."workpieceTypeId"
        LEFT JOIN "SizeRange" 
            on "SizeRange".id="Data"."sizeRangeId"
        LEFT JOIN "Length" 
            on "Length".id="Data"."lengthId"
		LEFT JOIN "Channel" 
            on "Channel".id="Data"."channelId"
		LEFT JOIN "Types" 
            on "Types".id="Data"."typeId"
        LEFT JOIN "FullModels" 
            on "FullModels".id="Data"."task"
        LEFT JOIN "Models" 
            on "Models".id="FullModels"."modelId"
        LEFT JOIN "Profile" 
            on "Profile".id="FullModels"."profileId"
        LEFT JOIN "SizeRange" "SizeRangeM"
            on "SizeRangeM".id="FullModels"."sizeRangeModelId"
        LEFT JOIN "LengthModel" 
            on "LengthModel".id="FullModels"."lengthModelId"
    WHERE "productionId"=${+data.productionId}
        and "widthOut" IS NOT NULL
        and "Data"."operationId"=26
        and "storeId" = ${+storeId};
    `) as any;
};
