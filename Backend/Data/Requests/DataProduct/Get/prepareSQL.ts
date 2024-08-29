export const prepareSQL = (articleId?: number) => {
    let articleIdFilter = '';
    if (articleId != undefined) {
        articleIdFilter = 'and public."DataProduct"."articleId"=$2';
    }

    return `
        SELECT 
            model,
            "DataProduct"."workpieceTypeId",
            "ResultsAssemble"."resultAssemble" as "workpieceType",
            "colorId",
            "ColorsAssemble"."colorAssemble" as color,
            length,
            "gradeId",
            "GradesAssemble"."gradeAssemble" as grade,
            "stateId",
            "State".state,
            "articleId",
            "typeAssemble"."typeAssemble",
            "Profile".profile,
            "SizeRange"."sizeRange",
            "fullModelId",
            "typeAssembleId",
            "widthIn",
            "countItemsIn"
            "widthOut",
            "countItemsOut",
            "moneyIn",
            "moneyOut"
        FROM 
            public."DataProduct" 
                LEFT JOIN public."ResultsAssemble" 
                    ON "ResultsAssemble".id = "DataProduct"."workpieceTypeId"
                LEFT JOIN public."ColorsAssemble" 
                    ON "ColorsAssemble".id = "DataProduct"."colorId"
                LEFT JOIN public."GradesAssemble" 
                    ON "GradesAssemble".id = "DataProduct"."gradeId"
                LEFT JOIN public."State" 
                    ON "State".id = "DataProduct"."stateId"		
                LEFT JOIN public."typeAssemble" 
                    ON "typeAssemble".id = "DataProduct"."typeAssembleId"		
                LEFT JOIN public."FullModels" 
                    ON "FullModels".id = "DataProduct"."fullModelId"		
                LEFT JOIN public."Profile" 
                    ON "Profile".id = "FullModels"."profileId"		
                LEFT JOIN public."SizeRange" 
                    ON "SizeRange".id = "FullModels"."sizeRangeModelId"		
        WHERE public."DataProduct"."storeId"=$1 
            and public."DataProduct"."active"=true
            ${articleIdFilter}
        ORDER BY "articleId" asc;
        `;
};
