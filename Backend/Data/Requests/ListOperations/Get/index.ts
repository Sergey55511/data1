import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { fullModelSQL } from '../../Data/constants';
import { dal } from './Dal';

export const getListOperations = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): PrismaPromise<T> => {
    const data = dal(req.query);

    const storeId = +user.storeId;
    return prisma.$queryRawUnsafe(`
        SELECT 
            "Data".id,
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
        WHERE "Data"."storeId"=${storeId} 
            AND date>='${data.start}' 
            AND date<='${data.end}'
    `) as any;
};
