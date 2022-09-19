import { NextApiResponse } from 'next';
import { MyError } from '../Classes/error';
import { iUser } from '../Types/interfaces';

export const resError = (err: any, res: NextApiResponse) => {
    console.log('err', err);
    const error = err as MyError;
    res.status(error?.status||500).json({ message: error?.message|| 'unexoected error' });
};

export const createAtkn = (user: iUser) => {
    return {
        id:user.id,
        login: user.login,
        status: user.status,
        store: user.store,
        storeId: user.storeId,
    };
};

export const makeRandomString = (length = 25) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
