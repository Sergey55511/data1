import CryptoJS from 'crypto-js';
import { KEY } from './consts';

export const decrypt = () => {
    const ciphertext = CryptoJS.AES.encrypt('hello text', KEY).toString();
    console.log('ciphertext', ciphertext);
    const bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log('decryptedData', decryptedData);
};
