import { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getColors = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const params = getFilters(req.query, user);

    return prisma.color.findMany({
        select: {
            id: true,
            color: true,
        },
        where: {
            activ: true,
            // Bridge: { some: params },
        },
        orderBy: { color: 'asc' },
    }) as any;
};
