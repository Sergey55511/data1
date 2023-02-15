import CryptoJS from 'crypto-js';

export const sendData = () => {
    const ciphertext = CryptoJS.AES.encrypt('hello text', 'secret key 123').toString();
    console.log('ciphertext', ciphertext);
    const bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log('decryptedData', decryptedData);
};
