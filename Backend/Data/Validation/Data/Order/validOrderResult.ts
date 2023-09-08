import { NextApiRequest } from 'next';
import { MyError } from '../../../../../Shared/Classes/error';
import { iData } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';

export const validOrderResult = async (prisma: tPrisma, req: NextApiRequest) => {
    const body = req.body as iData[];
    if (!body[0].pp) return;
    const where = {
        pp: body[0].pp,
    };

    const leftovers = await prisma.data.aggregate({
        _sum: { widthIn: true, countItemsIn: true },
        where,
    });

    if (leftovers._sum.widthIn || leftovers._sum.countItemsIn) {
        throw new MyError(400, 'ПП уже принят ранее.');
    }
};
