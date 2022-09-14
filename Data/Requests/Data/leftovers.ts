import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const leftovers = <T>(): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    return prisma.$queryRaw`SELECT 
                                "workpieceType",
                                model,
                                "sizeRange",
                                "colorType",
                                length,
                                channel,
                                grade,
                                state,
                                lot,
                                "numProduction",
                                round(sum("widthIn")::numeric,2)-round(sum("widthOut")::numeric,2) as "width",
                                round(sum("countItemsIn")::numeric,2)-round(sum("countItemsOut")::numeric,2) as "count",
                                sum("moneyIn")-sum("moneyOut") as "code"
                            FROM 
                                public."Data"	
                            GROUP BY 
                                "workpieceType",
                                model,
                                "sizeRange",
                                "colorType",
                                length,
                                channel,
                                grade,
                                state,
                                lot,
                                "numProduction"
                            HAVING round(sum("widthIn")::numeric,2)-round(sum("widthOut")::numeric,2)>0;`;
};
