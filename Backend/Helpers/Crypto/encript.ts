import CryptoJS from 'crypto-js';
import { KEY, SOLT, SOLT2 } from './consts';

export const encrypt = (value: string) => {
    return CryptoJS.AES.encrypt(`${SOLT}${value}${SOLT2}`, KEY).toString();
};
