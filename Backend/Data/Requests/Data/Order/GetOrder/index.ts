import jwt from 'jsonwebtoken';
import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
import { iCookies, iUser } from '../../../../../../Shared/Types/interfaces';
import { KEY } from '../../../../Services/createJWT';

export const getOrder = <T>(req: NextApiRequest): PrismaPromise<T> => {
    const cookies = req.cookies as iCookies;
    const atkn = jwt.verify(cookies?.atkn, KEY) as iUser;
    const storeId = atkn.storeId;
    const pp = req.query.pp

    const prisma = new PrismaClient();
    return prisma.$queryRaw`
        SELECT 
            pp,
			"userId",
			u."login" as "userLogin",
			"managerId",
			m."login" as "managerLogin",
			"operationId",
			"operation",
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
            COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0) as "width",
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0) as "count",
            COALESCE(sum("moneyIn"),0)-COALESCE(sum("moneyOut"),0) as "code"
        FROM 
            public."Data" left join "WorkpieceType" on "Data"."workpieceTypeId"="WorkpieceType".id
            left join "SizeRange" on "Data"."sizeRangeId"="SizeRange".id
            left join "MaterialGroup" on "Data"."materialGroupId"="MaterialGroup".id
			left join "Grade" on "Data"."gradeId"="Grade".id
			left join "Models" on "Data"."modelId"="Models".id
			left join "Color" on "Data"."colorId"="Color".id
			left join "Length" on "Data"."lengthId"="Length".id
			left join "Channel" on "Data"."channelId"="Channel".id
			left join "Users" m on "Data"."managerId"=m.id
			left join "Users" u on "Data"."userId"=u.id
			left join "Operations" on "Data"."operationId"="Operations".id
		WHERE "Data"."storeId"=${+storeId!} and "Data".pp=${+pp!}
        GROUP BY 
			pp,
			"userId",
			u."login",
			"managerId",
			m."login",
			"operationId",
			"operation",
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
            lot
        HAVING pp is not null and 
		COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)<>0 or
        COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0)<>0;
    `;
};
