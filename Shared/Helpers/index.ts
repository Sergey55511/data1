import { NextApiResponse } from 'next';
import { MyError } from '../Classes/error';
import { iQueryFilters, iUser } from '../Types/interfaces';

export const resError = (err: any, res: NextApiResponse) => {
    const error = err as MyError;
    res.status(error?.status || 500).json(err);
};

export const createAtkn = (user: iUser) => {
    return {
        id: user.id,
        login: user.login,
        status: user.status,
        store: user.store,
        storeId: user.storeId,
        role: user.role,
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

export const getQueryParams = (params: iQueryFilters) => {
    let result = '';
    const get = (FieldName: keyof iQueryFilters) => {
        const param = params[FieldName] ? `${FieldName}=${params[FieldName]}` : '';
        if (result) {
            result = param ? `${result}&${param}` : result;
        } else {
            result = param ? `?${param}` : result;
        }
    };

    for (const key in params) {
        get(key as keyof iQueryFilters);
    }
    return result;
};

export const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
