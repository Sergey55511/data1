import { NextApiRequest } from 'next';
import { getFilters, getQueryParam } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getColors = <T>(prisma: tPrisma, req: NextApiRequest): Promise<T> => {
    const params = getFilters(req.query);

    return prisma.color.findMany({
        select: {
            id: true,
            color: true,
        },
        where: {
            activ: true,
            Bridge: { some: params },
        },
        orderBy: { color: 'asc' },
    }) as any;
};
