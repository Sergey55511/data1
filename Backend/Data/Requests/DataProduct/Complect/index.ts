import { NextApiRequest } from 'next';
import { RESULTASSEMBLE } from '../../../../../Shared/constants';
import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const postDataProductComplect = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = dal(req.body);

    const dataProduct = await prisma.dataProduct.findFirst({
        where: { articleId: data.complect.articleId },
    });
    const pp = dataProduct?.pp;
    const date = new Date();
    const money = data.minaret.moneyOut ?? 0;
    let moneyInProduct = dataProduct?.moneyIn ?? 0;
    moneyInProduct = money + moneyInProduct;

    await prisma.data.create({ data: { ...data.minaret, date, pp } });

    await prisma.dataProduct.updateMany({
        data: {
            date,
            workpieceTypeId: RESULTASSEMBLE.chaplet.id,
            model: data.model,
            length: data.length,
            widthIn: data.width,
            moneyIn: moneyInProduct,
        },
        where: { articleId: data.complect.articleId },
    });

    return true as any;

    // return (await prisma.dataProduct.createMany({ data })) as any;
};