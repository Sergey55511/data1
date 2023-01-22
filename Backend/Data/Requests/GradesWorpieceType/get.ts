import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getGradesWorpieceType = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = dal(req.query);

    console.log('workpieceTypeId', data.workpieceTypeId);

    return prisma.grade.findMany({
        select: {
            id: true,
            grade: true,
        },
        where: {
            activ: true,
            WorkPieceTypeGradeBridge: {
                some: { workpieceTypeId: data.workpieceTypeId },
            },
        },
        orderBy: { grade: 'asc' },
    }) as any;
};
