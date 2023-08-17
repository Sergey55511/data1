import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';

export const getDataProduct = async <T>(prisma: tPrisma, user: iUser): Promise<T> => {
    const storeId = user.storeId;

    return (await prisma.$queryRaw`
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
            COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0) as "width",
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(sum("countItemsOut")::numeric,2),0) as "count",
            COALESCE(sum("moneyIn")::numeric,0)-COALESCE(sum("moneyOut")::numeric,0) as "code"
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
        WHERE public."DataProduct"."storeId"=${+storeId} 
            and public."DataProduct"."active"=true
        GROUP BY 
            model,
            "DataProduct"."workpieceTypeId",
            "ResultsAssemble"."resultAssemble",
            "colorId",
            "ColorsAssemble"."colorAssemble",
            length,
            "gradeId",
            "GradesAssemble"."gradeAssemble",
            "stateId",
            "State".state,
            "articleId",
            "typeAssemble"."typeAssemble",
            "Profile".profile,
            "SizeRange"."sizeRange",
            "fullModelId",
            "typeAssembleId"
        HAVING 
            COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)>0
                AND
            COALESCE(round(sum("countItemsIn")::numeric,2),0)-COALESCE(round(coalesce(sum("countItemsOut"),0)::numeric,2),0)>0
        ORDER BY "articleId" asc    
            ;
    `) as any;
};
