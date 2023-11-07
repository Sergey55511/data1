import { MyError } from '../../../../../Shared/Classes/error';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';

export const optimization = async <T>(prisma: tPrisma, user: iUser) => {
    if (user.status != 'admin') throw new MyError(403, 'Access denied');
    await prisma.$queryRaw`UPDATE public."Data" SET optimized=true;`;
    await prisma.$queryRaw`DELETE FROM public."OptimizedData";`;

    return prisma.$queryRaw`
        INSERT INTO public."OptimizedData"(
            pp,
            "storeId",
            "workpieceTypeId",
            "typeId",
            "sizeRangeId",
            "productionId",
            "fullModelId",
            "fractionId",
            "colorId",
            "lengthId",
            "channelId",
            "gradeId",
            "materialGroupId",
            "stateId",
            lot,
            "widthIn",
            "widthOut",
            "countItemsIn",
            "countItemsOut",
            "moneyIn",
            "moneyOut"
        )
        SELECT 
            pp,
            "storeId",
            "Data"."workpieceTypeId",
            "typeId",
            "Data"."sizeRangeId",
            "productionId",
            "fullModelId",
            "fractionId",
            "colorId",
            "lengthId",
            "channelId",
            "gradeId",
            "materialGroupId",
            "stateId",
            lot,
            COALESCE(round(sum("widthIn")::numeric,2),0) as "widthIn",
            COALESCE(round(sum("widthOut")::numeric,2),0) as "widthOut",
            COALESCE(round(sum("countItemsIn")::numeric,2),0) as "countItemsIn",
            COALESCE(round(sum("countItemsOut")::numeric,2),0) as "countItemsOut",
            COALESCE(sum("moneyIn")::numeric,0) as "moneyIn",
            COALESCE(sum("moneyOut")::numeric,0) as "moneyOut"
        FROM public."Data"
        WHERE active=true and "Data".optimized=true
        GROUP BY 
            pp,
            "storeId",
            "Data"."workpieceTypeId",
            "typeId",
            "sizeRangeId",
            "productionId",
            "fullModelId",
            "fractionId",
            "colorId",
            "lengthId",
            "channelId",
            "gradeId",
            "materialGroupId",
            "stateId",
            lot
        HAVING COALESCE(round(sum("widthIn")::numeric,2),0)-COALESCE(round(coalesce(sum("widthOut"),0)::numeric,2),0)<>0;
        `;
};
