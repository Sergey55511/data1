export const fullModelSQL = `(
    SELECT  
        concat("workpieceType",'_',"model",'_',"profile",'_',"sizeRange",'_',"length") as "fullModel"
    FROM public."FullModels"
        LEFT JOIN "WorkpieceType" ON "WorkpieceType".id = "FullModels"."workpieceTypeId"
        LEFT JOIN "Models" ON "Models".id = "FullModels"."modelId"
        LEFT JOIN "Profile" ON "Profile".id = "FullModels"."profileId"
        LEFT JOIN "SizeRangeModel" ON "SizeRangeModel".id = "FullModels"."sizeRangeModelId"
        LEFT JOIN "LengthModel" ON "LengthModel".id = "FullModels"."lengthModelId"
    WHERE "FullModels".id="fullModelId"
)`;
