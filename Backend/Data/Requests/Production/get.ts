import { PrismaPromise } from '@prisma/client';
import { tPrisma } from '../../../types';
import { NextApiRequest } from 'next';
import { dal } from './Dal';

export const getProduction = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = dal(req.query);

    const production = (await prisma.$queryRaw`
            SELECT 
            id,
            description,
            (
                SELECT "task"
                FROM "Data"  
                WHERE "productionId" = "Productions".id 
                    AND "task" IS NOT NULL
                LIMIT 1 
            ) as "fullModalId"
        FROM public."Productions"
        where id=${data.productionId};
    `) as any[];

    return production?.length ? production[0] : ([] as any);
};
