import { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getTypes = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const data = dal(req.query);

    return prisma.types.findMany({
        select: {
            id: true,
            type: true,
        },
        where: {
            active: true,
            WorkPieceTypeTypeBridge: { some: { workpieceTypeId: data.workpieceTypeId } },
        },
        orderBy: { type: 'asc' },
    }) as any;
};
