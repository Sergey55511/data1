import { NextApiRequest } from 'next';
import { MyError } from '../../../../../Shared/Classes/error';
import { iDataTable } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';

export const postMoveInValidation = async (prisma: tPrisma, req: NextApiRequest) => {
    const body = req.body as iDataTable[];
    const numDocument = body[0].numDocument;
    if (!numDocument) throw new MyError(400, 'Пустой запрос.');

    const checkUp = await prisma.data.aggregate({
        _sum: { widthIn: true, countItemsIn: true },
        where: { numDocument },
    });

    if (checkUp._sum.widthIn || checkUp._sum.countItemsIn) {
        throw new MyError(400, 'Перемещение уже оприходовано.');
    }
};
