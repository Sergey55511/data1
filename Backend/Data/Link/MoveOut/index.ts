import { encrypt } from '../../../Helpers/Crypto/encript';
import { makeRandomString } from '../../../../Shared/Helpers';
import axios, { AxiosError } from 'axios';
import { iDataTable } from '../../../../Shared/Types/interfaces';
import { NextApiRequest } from 'next';

export const moveOut = async (
    url: string | undefined,
    data: iDataTable[],
    red: NextApiRequest,
) => {
    if (!url) return;
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

    const key = makeRandomString();
    const value = encrypt(key);
    const { atkn, rtkn } = red.cookies;
    try {
        await axios({
            url: `http://${url}/api/getShared`,
            method: 'POST',
            withCredentials: true,
            headers: {
                Cookie: `key=${key}; value=${value};atkn=${atkn}; rtkn=${rtkn};`,
            },
            data,
        });
    } catch (err) {
        const error = err as AxiosError;
        if (error.response?.data) throw error.response?.data;
        throw error.response;
    }

    return { message: 'data sent' };
};
