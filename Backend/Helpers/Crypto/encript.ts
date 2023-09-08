import CryptoJS from 'crypto-js';
import { KEY, SOLT, SOLT2 } from './consts';
CryptoJS.lib.WordArray;
export const encrypt = (value: string) => {
    const res = CryptoJS.SHA256(`${SOLT}${value}${SOLT2}${KEY}`).toString();

    return res;
};
