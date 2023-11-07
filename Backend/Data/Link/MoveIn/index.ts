import { NextApiRequest } from 'next';
import { encrypt } from '../../../Helpers/Crypto/encript';
import { dal } from '../../Dal';
import { MyError } from '../../../../Shared/Classes/error';
import prisma from '../../Services/prisma';

export const moveIn = async (req: NextApiRequest) => {
    const data = dal(req);
    const { key, value } = req.cookies;

    if (!key) throw new MyError(401, 'not allowed');
    const valueEqual = encrypt(key);

    if (value != valueEqual) throw new MyError(401, 'not allowed');

    try {
        const cryptoKeyDb = await prisma.crypto.findFirst({
            select: { key: true },
            where: { key },
        });

        if (cryptoKeyDb?.key) throw new MyError(400, 'key already exists');

        const numDocument = data.find((item) => item.numDocument)?.numDocument;
        if (!numDocument) throw new MyError(400, 'num document is not set');

        const varifyNumDoc = await prisma.data.findFirst({ where: { numDocument } });

        if (varifyNumDoc) throw new MyError(400, 'the document was created before');

        await prisma.crypto.create({ data: { key } });

        await prisma.data.createMany({ data });

        return { message: 'data get successfully' };
    } catch (err) {
        prisma.$disconnect();
        throw err;
    }
};
