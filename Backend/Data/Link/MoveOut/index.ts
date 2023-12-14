import { encrypt } from '../../../Helpers/Crypto/encript';
import { makeRandomString } from '../../../../Shared/Helpers';
import axios, { AxiosError } from 'axios';
import { iCookiesAuth, iDataTable } from '../../../../Shared/Types/interfaces';

export const moveOut = async (
    url: string | undefined,
    data: iDataTable[],
    cookies: iCookiesAuth,
) => {
    if (!url) return;

    const key = makeRandomString();
    const value = encrypt(key);
    console.log('cookies', cookies);

    const atkn = cookies?.atkn;
    const rtkn = cookies?.rtkn;

    try {
        await axios({
            url: `https://${url}/api/getShared`,
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
