UPDATE
    public."FullModels"
SET
    "fullModel" =(
        SELECT
            concat(
                "model",
                CASE
                    WHEN "model" IS NOT NULL THEN CASE
                        WHEN "profile" IS NOT NULL THEN '_'
                    END
                END,
                "profile",
                CASE
                    WHEN "profile" IS NOT NULL THEN CASE
                        WHEN "sizeRange" IS NOT NULL THEN '_'
                    END
                END,
                "sizeRange",
                CASE
                    WHEN "sizeRange" IS NOT NULL THEN CASE
                        WHEN "length" IS NOT NULL THEN '_'
                    END
                END,
                "length"
            ) as name
        FROM
            public."FullModels" as fm
            LEFT JOIN "Models" ON "Models".id = "fm"."modelId"
            LEFT JOIN "Profile" ON "Profile".id = "fm"."profileId"
            LEFT JOIN "SizeRange" ON "SizeRange".id = "fm"."sizeRangeModelId"
            LEFT JOIN "LengthModel" ON "LengthModel".id = "fm"."lengthModelId"
        WHERE
            "FullModels".id = "fm".id
    )