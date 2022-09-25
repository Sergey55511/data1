import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { MyError } from '../../../../Shared/Classes/error';
import { iData } from '../../../../Shared/Types/interfaces';

export const validateLeftovers = async (req: NextApiRequest) => {
    const prisma = new PrismaClient();
    const body = req.body as iData;
    const where = {
        workpieceTypeId: body.workpieceTypeId,
        modelId: body.modelId,
        sizeRangeId: body.sizeRangeId,
        colorId: body.colorId,
        lengthId: body.lengthId,
        channelId: body.channelId,
        gradeId: body.gradeId,
        materialGroupId: body.materialGroupId,
        stateId: body.stateId,
        lot: body.lot,
    };
    const leftovers = await prisma.data.aggregate({
        _sum: { widthIn: true, widthOut: true, countItemsIn: true, countItemsOut: true },
        where,
    });
    const leftoversWidth = (leftovers._sum.widthIn || 0) - (leftovers._sum.widthOut || 0);
    const leftoversCount =
        (leftovers._sum.countItemsIn || 0) - (leftovers._sum.countItemsOut || 0);
    if (leftoversWidth - (body.widthOut || 0) < 0) {
        throw new MyError(400, 'Отрицательный остаток гр.');
    }
    if (leftoversCount - (body.countItemsOut || 0) < 0) {
        throw new MyError(400, 'Отрицательный остаток шт.');
    }
};
