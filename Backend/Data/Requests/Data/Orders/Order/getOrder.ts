import jwt from 'jsonwebtoken';
import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { iCookies, iUser } from '../../../../../../Shared/Types/interfaces';
import { KEY } from '../../../../Services/createJWT';
import { tPrisma } from '../../../../../types';

export const getOrder = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    const cookies = req.cookies as iCookies;
    const atkn = jwt.verify(cookies?.atkn, KEY) as iUser;
    const storeId = atkn.storeId;
    const pp = req.query.pp;

    return prisma.$queryRaw`
        SELECT 
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
            size,
			"operationId",
			"operation",
			"workpieceTypeId",
            "workpieceType",
            "fullModelId",
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
            "widthOut",
            COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0) as "width",
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0) as "count",
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
		WHERE "Data"."storeId"=${+storeId!} and "Data".pp=${+pp!}
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
            size,
			"operationId",
			"operation",
            "workpieceTypeId",
            "workpieceType",
			"fullModelId",
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
            "widthOut"
        HAVING pp is not null and 
		COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)<>0
    `;
};
