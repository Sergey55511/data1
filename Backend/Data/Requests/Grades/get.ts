import { NextApiRequest } from 'next';
import { OPERATIONS } from '../../../../Shared/constants';
import { iUser } from '../../../../Shared/Types/interfaces';
import { getFilters } from '../../../Helpers/getQueryParam';
import { tPrisma } from '../../../types';

export const getGrades = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const params = getFilters(req.query, user);

    if (
        [OPERATIONS.sortingElements.id, OPERATIONS.resortingElements.id].includes(
            params.operationId || 0,
        )
    ) {
        return prisma.grade.findMany({
            select: {
                id: true,
                grade: true,
            },
            where: {
                activ: true,
                WorkPieceTypeGradeBridge: {
                    some: { workpieceTypeId: params.workpieceTypeId },
                },
            },
            orderBy: { grade: 'asc' },
        }) as any;
    }

    return prisma.grade.findMany({
        select: {
            id: true,
            grade: true,
        },
        where: {
            activ: true,
            Bridge: {
                some: params,
            },
        },
        orderBy: { grade: 'asc' },
    }) as any;
};
