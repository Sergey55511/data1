import { iDataTable } from '../../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../../types';
import { WORKPIECETYPE } from '../../../../../../../Shared/constants';
import { prepareNumber } from './Dal';

export const prepareData = async (prisma: tPrisma, data: iDataTable[]) => {
    console.log('data', data);

    const taskItem = data.find((item) => item.task);
    const isTask = !!taskItem;

    let workpieceTypeId: number | null | undefined = 0;

    if (isTask) {
        const workpieceTypeIdModel = await prisma.fullModels.findFirst({
            select: { workpieceTypeId: true },
            where: { id: taskItem.task },
        });
        workpieceTypeId = workpieceTypeIdModel?.workpieceTypeId;
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
                item.sizeRangeId = undefined;
                item.lengthId = undefined;
            }
        }

        return item;
    });
};
