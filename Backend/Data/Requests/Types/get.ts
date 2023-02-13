import { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getTypes = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const params = getFilters(req.query, user);

    return prisma.types.findMany({
        select: {
            id: true,
            type: true,
        },
        where: {
            active: true,
            // Bridge: { some: params },
        },
        orderBy: { type: 'asc' },
    }) as any;
};
