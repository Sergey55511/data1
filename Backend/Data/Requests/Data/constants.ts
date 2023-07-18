export const getfullModelSQL = (idField = 'fullModelId', name = 'fullModel') => `(
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
            "length") as "${name}"
    FROM public."FullModels"
        LEFT JOIN "Models" ON "Models".id = "FullModels"."modelId"
        LEFT JOIN "Profile" ON "Profile".id = "FullModels"."profileId"
        LEFT JOIN "SizeRange" ON "SizeRange".id = "FullModels"."sizeRangeModelId"
        LEFT JOIN "LengthModel" ON "LengthModel".id = "FullModels"."lengthModelId"
    WHERE "FullModels".id="${idField}"
)`;

export const fullModelSQL = getfullModelSQL();
export const fullModelSQLTask = getfullModelSQL('task', 'fullModelTask');
