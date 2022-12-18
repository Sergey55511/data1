import { NextApiRequest } from 'next';
import { MyError } from '../../../../Shared/Classes/error';
import { round } from '../../../../Shared/Helpers';
import { iData } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const validateLeftovers = async (prisma: tPrisma, req: NextApiRequest) => {
    const data = req.body.data as iData[];
    const storeId = req.body.storeId as number;
    const maxId = req.body.maxId as number;
    const maxIdDB = await prisma.data.findFirst({
        select: { id: true },
        where: { active: true, storeId: storeId },
        orderBy: { id: 'desc' },
    });

    if (maxIdDB?.id == maxId) {
        return true;
    }

    for (const item of data) {
        const where = {
            workpieceTypeId: item.workpieceTypeId,
            sizeRangeId: item.sizeRangeId,
            colorId: item.colorId,
            lengthId: item.lengthId,
            channelId: item.channelId,
            gradeId: item.gradeId,
            materialGroupId: item.materialGroupId,
            stateId: item.stateId,
            lot: item.lot,
        };
        const leftovers = await prisma.data.aggregate({
            _sum: {
                widthIn: true,
                widthOut: true,
                countItemsIn: true,
                countItemsOut: true,
            },
            where,
        });
        let leftoversWidth =
            (leftovers._sum.widthIn || 0) - (leftovers._sum.widthOut || 0);
        let leftoversCount =
            (leftovers._sum.countItemsIn || 0) - (leftovers._sum.countItemsOut || 0);

        leftoversWidth = round(leftoversWidth);
        const widthOut = round(item.widthOut || 0);

        if (leftoversWidth - widthOut < 0) {
            throw new MyError(400, 'Отрицательный остаток гр.');
        }

        leftoversCount = round(leftoversCount);
        const countItemsOut = round(item.countItemsOut || 0);

        if (leftoversCount - countItemsOut < 0) {
            throw new MyError(400, 'Отрицательный остаток шт.');
        }
    }
};
