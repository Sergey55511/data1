import { NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { MyError } from '../../../../../Shared/Classes/error';
import { iData } from '../../../../../Shared/Types/interfaces';

export const validOrderResult = async (req: NextApiRequest) => {
    const prisma = new PrismaClient();
    const body = req.body as iData[];
    const where = {
        pp: body[0].pp,
    };
    const leftovers = await prisma.data.aggregate({
        _sum: { widthIn: true,countItemsIn: true },
        where,
    });
    
    if (leftovers._sum.widthIn || leftovers._sum.countItemsIn) {
        throw new MyError(400, 'ПП уже принят ранее.');
    }
};
