import { PrismaPromise } from '@prisma/client';
import { iUser } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const getProductions = <T>(prisma: tPrisma, user: iUser): PrismaPromise<T> => {
    return prisma.$queryRawUnsafe(`
        SELECT 
        "Productions".id,
        description,
        (	
            SELECT  
                concat(
                    "model",
                    CASE WHEN "model" IS NOT NULL THEN 
                        CASE WHEN "profile" IS NOT NULL THEN '_' END
                    END,
                    "profile",
                    CASE WHEN "profile" IS NOT NULL THEN
                        CASE WHEN "sizeRange" IS NOT NULL THEN '_' END
                    END,
                    "sizeRange",
                    CASE WHEN "sizeRange" IS NOT NULL THEN 
                        CASE WHEN "length" IS NOT NULL THEN '_' END 
                    END,
                    "length") as "fullModel"
            FROM public."FullModels"
                LEFT JOIN "Models" ON "Models".id = "FullModels"."modelId"
                LEFT JOIN "Profile" ON "Profile".id = "FullModels"."profileId"
                LEFT JOIN "SizeRange" ON "SizeRange".id = "FullModels"."sizeRangeModelId"
                LEFT JOIN "LengthModel" ON "LengthModel".id = "FullModels"."lengthModelId"
            WHERE "FullModels".id=(
                    SELECT task 
                    FROM "Data"
                    WHERE "Data"."productionId"="Productions".id and "Data".task > 0
                    ORDER BY "Data".id ASC
                    LIMIT 1
                )	
        )
        FROM public."Productions"
        WHERE active = true and "storeId"=${+user.storeId}
        ORDER BY id DESC;
    `) as any;
};
