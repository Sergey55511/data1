import { NextApiRequest } from 'next';
import { MyError } from '../../../../Shared/Classes/error';
import { iData, iUser } from '../../../../Shared/Types/interfaces';
import { prisma } from '../../Services/prisma';

export const validateLeftovers = async (req: NextApiRequest, user: iUser) => {
    const data = req.body.data as iData[];
    const storeId = user.storeId as number;
    const maxId = req.body.maxId as number;
    const maxIdDB = await prisma.data.aggregate({
        _max: { id: true },
        where: { active: true, stateId: storeId },
    });

    if (maxIdDB._max.id == maxId) {
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
        const leftoversWidth =
            (leftovers._sum.widthIn || 0) - (leftovers._sum.widthOut || 0);
        const leftoversCount =
            (leftovers._sum.countItemsIn || 0) - (leftovers._sum.countItemsOut || 0);
        if (leftoversWidth - (item.widthOut || 0) < 0) {
            throw new MyError(400, 'Отрицательный остаток гр.');
        }
        if (leftoversCount - (item.countItemsOut || 0) < 0) {
            throw new MyError(400, 'Отрицательный остаток шт.');
        }
    }
};
