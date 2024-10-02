import { PrismaPromise } from '@prisma/client';
import { iUser } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const getProductions = <T>(prisma: tPrisma, user: iUser): PrismaPromise<T> => {
    return prisma.$queryRawUnsafe(`
        SELECT 
            "Productions".id,
            description,
            "FullModels"."fullModel"
        FROM public."Productions"
            left join "FullModels" on "FullModels".id="Productions"."fullModelId"
        WHERE "Productions".active = true and "storeId"=${+user.storeId}
        ORDER BY id DESC;
    `) as any;
};
