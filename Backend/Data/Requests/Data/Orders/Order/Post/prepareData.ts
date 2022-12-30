import { iDataTable } from '../../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../../types';
import { WORKPIECETYPE } from '../../../../../../../Shared/constants';
import { prepareNumber } from './Dal';

export const prepareData = async (prisma: tPrisma, data: iDataTable[]) => {
    const taskItem = data.find((item) => item.task);
    const isTask = !!taskItem;

    let workpieceTypeId: number | undefined = undefined;
    let sizeRangeId: number | undefined = undefined;

    if (isTask) {
        const fullModel = await prisma.fullModels.findFirst({
            select: { workpieceTypeId: true, sizeRangeModelId: true, modelId: true },
            where: { id: taskItem.task },
        });
        workpieceTypeId = fullModel?.workpieceTypeId as typeof workpieceTypeId;
        sizeRangeId = fullModel?.sizeRangeModelId as typeof sizeRangeId;
    }

    return data.map((item) => {
        const isMoveBack = (item.widthOut || 0) < 0;

        if (!isMoveBack) {
            if (isTask) {
                if (
                    ![
                        WORKPIECETYPE.defect.id,
                        WORKPIECETYPE.garbage.id,
                        WORKPIECETYPE.losses.id,
                        WORKPIECETYPE.prunes.id,
                    ].includes(item.workpieceTypeId || 0)
                ) {
                    item.workpieceTypeId = prepareNumber(workpieceTypeId);
                }
                item.fullModelId = prepareNumber(item.task);
                item.sizeRangeId = sizeRangeId;
                item.lengthId = undefined;
            }
        }

        item.task=undefined
        
        return item;
    });
};
