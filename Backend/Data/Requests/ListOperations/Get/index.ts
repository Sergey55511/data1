import { PrismaPromise } from '@prisma/client';
import moment from 'moment';
import { NextApiRequest } from 'next';
import { MyError } from '../../../../../Shared/Classes/error';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const getListOperations = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): PrismaPromise<T> => {
    const data = dal(req.query);
    if (!moment(data.start).isValid()) {
        throw new MyError(400, 'invalid date start');
    }
    if (!moment(data.end).isValid()) {
        throw new MyError(400, 'invalid date end');
    }

    const storeId = +user.storeId;
    return prisma.$queryRawUnsafe(
        `
        SELECT 
            "Data".id,
            "Data"."numDocument",
            "Data"."workpieceTypeId",
            "managerId",
            "Managers".name as "managerLogin",
            pp,
            date,
            "workpieceType",
            "typeId",
            type,
            "operationId",
            "Operations".operation,
            "sizeRangeId",
            "sizeRange",
            "SizeRange".size,
            "productionId",
            "Productions".description as "production",
            "fullModelId",
            "FullModels"."fullModel",
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
            "widthIn",
            "widthOut",
            "countItemsIn",
            "countItemsOut",
            "moneyIn",
            "moneyOut"
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
            LEFT JOIN "Operations" on "Data"."operationId"="Operations".id
            LEFT JOIN "Managers" on "Data"."managerId"="Managers".id
        WHERE "Data"."storeId"=$1 
            AND date>=$2 
            AND date<=$3
            ${data.pp ? `AND pp=$4` : ''}
            ${data.lot ? `AND lot=$5` : ''}
            ${data.operationId ? `AND "operationId"=$6` : ''}
            ${data.numDocument ? `AND "numDocument" ILIKE $7` : ''}
        ORDER BY "Data".id ASC
    `,
        storeId,
        new Date(data.start),
        new Date(data.end),
        data.pp ?? 0,
        data.lot ?? 0,
        data.operationId ?? 0,
        data.numDocument ? `%${data.numDocument}%` : '',
    ) as any;
};
