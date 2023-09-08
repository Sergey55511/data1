import { NextApiRequest } from 'next';
import { STORES } from '../../../../../../../Shared/constants';
import { iUser } from '../../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../../types';
import { dal } from './Dal';

export const getMinorAccessoryLeftovers = (
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
) => {
    if (user.storeId != STORES.Moscow.id) return [] as any;
    const data = dal(req.query);
    return prisma.$queryRawUnsafe(
        `
            SELECT  
                "idAccessory",
                "Locks".material,
                "Locks".color,
                "Locks".size,
                "Locks"."type",
                COALESCE(round(sum("countIn")::numeric,2),0)-COALESCE(round(coalesce(sum("countOut"),0)::numeric,2),0) as "count",
                COALESCE(round(sum("moneyIn")::numeric,2),0)-COALESCE(round(coalesce(sum("moneyOut"),0)::numeric,2),0) as "code"
            FROM public."MinorAccessoryData"
                LEFT JOIN "Locks"
                    ON "Locks".id = "MinorAccessoryData"."idAccessory"
            WHERE "idAccessory"=$1 and "storeId"=$2
            GROUP BY 
                "idAccessory",
                "Locks".material,
                "Locks".color,
                "Locks".size,
                "Locks"."type";
    `,
        data.idAccessory,
        user.storeId,
    ) as any;
};
