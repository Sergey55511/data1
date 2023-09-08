import CryptoJS from 'crypto-js';
import { KEY, SOLT, SOLT2 } from './consts';

export const decrypt = (value: string) => {
    return CryptoJS.AES.decrypt(`${SOLT}${value}${SOLT2}`, KEY).toString(
        CryptoJS.enc.Utf8,
    );
};
