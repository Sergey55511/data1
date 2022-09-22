import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { MyError } from '../../../../Shared/Classes/error';

export const validateLeftovers = async (req: NextApiRequest) => {
    const prisma = new PrismaClient();
    const countItemsOut = req.body.countItemsOut;
    const widthOut = req.body.widthOut;
    const where = {
        workpieceTypeId: req.body.workpieceTypeId,
        modelId: req.body.modelId,
        sizeRangeId: req.body.sizeRangeId,
        colorId: req.body.colorId,
        lengthId: req.body.lengthId,
        channelId: req.body.channelId,
        gradeId: req.body.gradeId,
        materialGroupId: req.body.materialGroupId,
        stateId: req.body.stateId,
        lot: req.body.lot,
    };
    const leftoversWidth = await prisma.data.aggregate({
        _sum: { widthIn: true, widthOut: true, countItemsIn: true, countItemsOut: true },
        where,
    });
    // const leftoversWidth = await prisma.data.findMany({
    //     where,
    // });

    console.log('leftoversWidth', leftoversWidth);

    // const leftoversCount = (await prisma.$queryRaw`SELECT 60 as countItemsOut`) as any[];
    // if (
    //     (leftoversWidth._sum.widthOut || 0) - widthOut < 0 ||
    //     leftoversCount[0].countItemsOut - countItemsOut < 0
    // )
    //     throw new MyError(400, 'Отрицательный остаток');
};
