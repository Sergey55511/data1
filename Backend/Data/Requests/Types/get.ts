import { NextApiRequest } from 'next';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getTypes = <T>(prisma: tPrisma, req: NextApiRequest): Promise<T> => {
    const params = getFilters(req.query);
    
    return prisma.types.findMany({
        select: {
            id: true,
            type: true,
        },
        where: {
            active: true,
            Bridge: { some: params },
        },
        orderBy: { type: 'asc' },
    }) as any;
};
