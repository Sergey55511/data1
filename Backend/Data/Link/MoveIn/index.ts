import { tPrisma } from '../../../types';
import { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { encrypt } from '../../../Helpers/Crypto/encript';
import { dal } from '../../Dal';
import { MyError } from '../../../../Shared/Classes/error';

export const moveOut = async (prisma: tPrisma, req: NextApiRequest, user: iUser) => {
    const data = dal(req);
    const { key, value } = req.cookies;

    if (!key) throw new MyError(401, 'not allowed');
    const valueEqual = encrypt(key);
    if (value != valueEqual) throw new MyError(401, 'not allowed');

    const cryptoKeyDb = await prisma.crypto.findFirst({
        select: { key: true },
        where: { key },
    });

    if (cryptoKeyDb?.key) throw new MyError(400, 'key already exists');

    await prisma.crypto.create({ data: { key } });

    await prisma.data.createMany({ data });

    return { message: 'data get successfully' };
};
