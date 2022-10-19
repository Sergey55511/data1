import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../../../types';

export const getMoveIn = <T>(prisma: tPrisma,storeId: number, numDocument: string): PrismaPromise<T> => {

    return prisma.$queryRaw`
        SELECT 
            "Data".id,
            "Users".login as "userLogin",
            "Stores"."name" as store,
            "numDocument",
            "workpieceTypeId",
            "workpieceType",
            "productionId",
            "Productions".description as "production",
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
            "countItemsOut"
        FROM "Data" 
            LEFT JOIN "Recipients" ON "Data"."recipientId" = "Recipients".id
            LEFT JOIN "Stores" ON "Data"."storeId" = "Stores".id
            LEFT JOIN "Users" ON "Data"."userId" = "Users".id
            LEFT JOIN "WorkpieceType" on "Data"."workpieceTypeId"="WorkpieceType".id
            LEFT JOIN "Fraction" on "Data"."fractionId"="Fraction".id
            LEFT JOIN "MaterialGroup" on "Data"."materialGroupId"="MaterialGroup".id
            LEFT JOIN "Grade" on "Data"."gradeId"="Grade".id
            LEFT JOIN "Models" on "Data"."modelId"="Models".id
            LEFT JOIN "Color" on "Data"."colorId"="Color".id
            LEFT JOIN "Length" on "Data"."lengthId"="Length".id
            LEFT JOIN "Channel" on "Data"."channelId"="Channel".id
            LEFT JOIN "Productions" on "Data"."productionId"="Productions".id
            LEFT JOIN "State" on "Data"."stateId"="State".id
        WHERE "Recipients"."storeId"=${+storeId} AND "Data"."numDocument"=${numDocument};
    `;
};