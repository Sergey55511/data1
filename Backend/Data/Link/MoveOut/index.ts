import { tPrisma } from '../../../types';
import { NextApiRequest } from 'next';
import { iUser } from '../../../../Shared/Types/interfaces';
import { encrypt } from '../../../Helpers/Crypto/encript';
import { makeRandomString } from '../../../../Shared/Helpers';
import axios from 'axios';
import { dal } from '../../Dal';

export const moveOut = async (prisma: tPrisma, req: NextApiRequest, user: iUser) => {
    const data = dal(req);
    const key = makeRandomString();
    const value = encrypt(key);
    await axios({
        url: 'http://',
        method: 'POST',
        headers: {
            Cookie: `key=${key}; value=${value};`,
        },
        data,
    });
    return { message: 'data sent' };
};
