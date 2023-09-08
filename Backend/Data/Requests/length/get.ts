import { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getLength = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const params = getFilters(req.query, user);

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
