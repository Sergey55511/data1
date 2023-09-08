import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../../types';
import { dal } from './Dal';

export const getWorkpieceTypeModel = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = dal(req.query);

    return prisma.workpieceType.findMany({
        select: {
            id: true,
            workpieceType: true,
            nextTypeId: true,
        },
        where: {
            active: true,
            isMinaletGroup: data.isminaletgroup,
            isShow: true,
            OperationWorkPieceTypeBridge: {
                some: { active: true, operationsId: data.operationId },
            },
            FullModels: { some: { active: true } },
        },
        orderBy: { workpieceType: 'asc' },
    }) as any;
};
