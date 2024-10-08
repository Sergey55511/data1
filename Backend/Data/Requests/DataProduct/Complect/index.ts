import { NextApiRequest } from 'next';
import { MyError } from '../../../../../Shared/Classes/error';
import { OPERATIONS, RESULTASSEMBLE, STATE } from '../../../../../Shared/constants';
import { iDataTable, iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const postDataProductComplect = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): Promise<T> => {
    const data = dal(req.body);

    const dataProducts = await prisma.dataProduct.findMany({
        where: { articleId: data.complect.articleId },
    });
    const length = dataProducts.length;
    if (!length) throw new MyError(400, 'data product is not exist');

    const dataProduct = dataProducts[length - 1];

    const pp = dataProduct?.pp ?? undefined;
    const date = new Date();

    const storeId = user.storeId;
    const userId = user.id;

    const newDataItems: iDataTable[] = [];
    const money = data.complectItems.reduce((state, item) => {
        newDataItems.push({
            ...item,
            storeId,
            date,
            pp,
            operationId: OPERATIONS.assemble.id,
            userId,
        });
        const money = item.moneyOut ?? 0;
        return (state += money);
    }, 0);

    let moneyInProduct = dataProduct?.moneyIn ?? 0;
    moneyInProduct = money + moneyInProduct;

    await prisma.data.createMany({
        data: newDataItems,
    });

    await prisma.dataProduct.updateMany({
        data: {
            date,
            workpieceTypeId: RESULTASSEMBLE.chaplet.id,
            model: data.model,
            length: data.length,
            widthIn: data.width,
            moneyIn: moneyInProduct,
            stateId: STATE.createdProduct.id,
        },
        where: { articleId: data.complect.articleId },
    });

    return true as any;

    // return (await prisma.dataProduct.createMany({ data })) as any;
};
