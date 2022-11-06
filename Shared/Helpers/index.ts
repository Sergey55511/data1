import { NextApiResponse } from 'next';
import { MyError } from '../Classes/error';
import { iData, iDataTable, iQueryFilters, iUser } from '../Types/interfaces';

export const prepareDataTable = (data: iData): iDataTable => {
    const dataTableKeys = [
        'lot',
        'numProduction',
        'pp',
        'typeId',
        'workpieceTypeId',
        'numDocument',
        'userId',
        'managerId',
        'modelId',
        'recipientId',
        'sizeRangeId',
        'fractionId',
        'materialGroupId',
        'colorId',
        'lengthId',
        'channelId',
        'gradeId',
        'stateId',
        'storeId',
        'productionId',
        'operationId',
        'countItemsOut',
        'widthOut',
        'widthIn',
        'date',
        'moneyIn',
        'moneyOut',
    ];
    const result: iDataTable = {};
    Object.keys(data).forEach((key) => {
        const keyDt = key as keyof iDataTable;
        if (dataTableKeys.includes(key)) result[keyDt] = data[keyDt];
    });
    return result;
};

export const resError = (err: any, res: NextApiResponse) => {
    console.log('err', err);
    const error = err as MyError;
    res.status(error?.status || 500).json({
        message: error?.message || 'unexoected error',
    });
};

export const createAtkn = (user: iUser) => {
    return {
        id: user.id,
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
