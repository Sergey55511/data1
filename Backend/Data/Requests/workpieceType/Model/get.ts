import { tPrisma } from '../../../../types';

export const getWorkpieceTypeModel = <T>(prisma: tPrisma): Promise<T> => {
    return prisma.workpieceType.findMany({
        select: {
            id: true,
            workpieceType: true,
            nextTypeId: true,
        },
        where: {
            active: true,
            isShow: true,
            OperationWorkPieceTypeBridge: { some: { active: true,operationsId: 26 } },
            FullModels: { some: { active: true } },
        },
        orderBy: { workpieceType: 'asc' },
    }) as any;
};
