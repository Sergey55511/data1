import { NextApiRequest } from 'next';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getWorkpieceType = <T>(prisma: tPrisma, req: NextApiRequest): Promise<T> => {
    const params = getFilters(req.query);

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
