export const fullModelSQL = `(
    SELECT  
        concat(
            "model",
            CASE WHEN "model" IS NOT NULL THEN '_' END,
            "profile",
            CASE WHEN "profile" IS NOT NULL THEN '_' END,
            "sizeRange",
            CASE WHEN "sizeRange" IS NOT NULL THEN '_' END,
            "length") as "fullModel"
    FROM public."FullModels"
        LEFT JOIN "Models" ON "Models".id = "FullModels"."modelId"
        LEFT JOIN "Profile" ON "Profile".id = "FullModels"."profileId"
        LEFT JOIN "SizeRangeModel" ON "SizeRangeModel".id = "FullModels"."sizeRangeModelId"
        LEFT JOIN "LengthModel" ON "LengthModel".id = "FullModels"."lengthModelId"
    WHERE "FullModels".id="fullModelId"
)`;
