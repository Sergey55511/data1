import { NextApiRequest } from 'next';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getLength = <T>(prisma: tPrisma, req: NextApiRequest): Promise<T> => {
    const params = getFilters(req.query);

    return prisma.length.findMany({
        select: {
            id: true,
            length: true,
        },
        where: {
            active: true,
            Bridge: { some: params },
        },
        orderBy: { length: 'asc' },
    }) as any;
};
