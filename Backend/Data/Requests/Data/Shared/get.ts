import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const getShared = <T>(storeId: number): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.$queryRaw`
        SELECT 
            date,
            "Users".login as "userLogin",
            "Stores"."name" as store,
            "numDocument",
            count(*)::int as "countRows"
        FROM "Data" 
            LEFT JOIN "Recipients" ON
                "Data"."recipientId" = "Recipients".id
            LEFT JOIN "Stores" ON 
                "Data"."storeId" = "Stores".id
            LEFT JOIN "Users" ON 
                "Data"."userId" = "Users".id
        WHERE "Recipients"."storeId"=${+storeId!} AND 
            "Data"."numDocument" in (
                SELECT "numDocument"
                FROM "Data"
                WHERE COALESCE("widthIn",0) + COALESCE("countItemsIn",0)=0
            )
        GROUP BY 
            date,
            "Users".login,
            "Stores"."name",
            "numDocument";
    `;
};
