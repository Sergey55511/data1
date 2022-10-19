import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../../types';

export const getShared = <T>(prisma: tPrisma, storeId: number): PrismaPromise<T> => {
    return prisma.$queryRaw`
        SELECT 
            date,
            "Users".login as "userLogin",
            "Stores"."name" as store,
            "numDocument",
            count(*)::int as countRows
        FROM "Data" 
            LEFT JOIN "Recipients" ON
                "Data"."recipientId" = "Recipients".id
            LEFT JOIN "Stores" ON 
                "Data"."storeId" = "Stores".id
            LEFT JOIN "Users" ON 
                "Data"."userId" = "Users".id
        WHERE "Recipients"."storeId"=${+storeId} AND 
            "Data"."numDocument" in (
                SELECT "numDocument"
                FROM "Data"
                GROUP BY "numDocument"
                HAVING COALESCE(SUM("widthIn"),0) + COALESCE(SUM("countItemsIn"),0)=0
            )
        GROUP BY 
            date,
            "Users".login,
            "Stores"."name",
            "numDocument";
    `;
};
