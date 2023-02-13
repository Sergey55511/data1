import { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getWorkpieceType = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const params = getFilters(req.query, user);

    return prisma.workpieceType.findMany({
        select: {
            id: true,
            workpieceType: true,
            nextTypeId: true,
        },
        where: { active: true, isShow: true, Brige: { some: params } },
        orderBy: { workpieceType: 'asc' },
    }) as any;
};
