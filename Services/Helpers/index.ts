import { NextApiResponse } from 'next';
import { MyError } from '../../Classes/error';
import { iUser } from '../../Store/interfaces';

export const resError = (err: any, res: NextApiResponse) => {
    console.log('err', err);
    const error = err as MyError;
    res.status(error.status).json({ message: error.message });
};

export const createAtkn = (user: iUser) => {
    return {
        login: user.login,
        status: user.status,
        store: user.store,
        storeId: user.storeId,
    };
};
