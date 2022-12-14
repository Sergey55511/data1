import { NextApiRequest } from 'next';
import { MyError } from '../../../../../Shared/Classes/error';
import { OPERATIONS } from '../../../../../Shared/constants';
import { iDataProductTable, iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const takeApart = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const data = dal(req.body);

    const products = await prisma.dataProduct.findMany({
        select: {
            storeId: true,
            model: true,
            managerId: true,
            workpieceTypeId: true,
            colorId: true,
            length: true,
            gradeId: true,
            stateId: true,
            articleId: true,
            Recipient: true,
            widthIn: true,
            widthOut: true,
            moneyIn: true,
            countItemsIn: true,
        },
        where: { articleId: { in: data.articles }, active: true, storeId: 1 },
    });

    if (!products.length) {
        throw new MyError(400, 'Не найдены изделия на складу');
    }

    const movedOutProductions = products
        .filter((item) => item.widthOut)
        .map((item) => item.articleId);
    if (movedOutProductions.length) {
        throw new MyError(
            400,
            `Следующие изделия были отгружены ранее (${movedOutProductions.join(',')})`,
        );
    }

    const preparedData = products.map((item) => ({
        ...item,
        widthIn: undefined,
        widthOut: item.widthIn,
        countItemsIn: undefined,
        countItemsOut: item.countItemsIn,
        operationId: OPERATIONS.shareItems.id,
        userId: data.userId,
        recipientId: data.recipientId,
        numDocument: data.numDocument,
    }));

    return (await prisma.dataProduct.createMany({ data: preparedData })) as any;
};
