import axios from 'axios';
import {
    iAccessoryDana,
    iBigouterueBridje,
    iBijouterie,
    iBijouterieArticles,
    iDataTable,
    iLock,
} from '../../../../Shared/Types/interfaces';

export const getBijouterieArticles = () => {
    return axios({
        url: `/api/data/bijouterie/articles`,
        method: 'GET',
    }).then((res) => res.data as iBijouterieArticles[]);
};
export const getMinorAccessoryLeftovers = (idAccessory: number) => {
    return axios({
        url: `/api/data/bijouterie/minorAccessory`,
        method: 'GET',
        params: { idAccessory },
    }).then((res) => res.data as iAccessoryDana[]);
};
export const postMinorAccessory = (data: {
    idAccessory: number;
    countIn?: number;
    countOut?: number;
    pp?: number;
}) => {
    return axios({
        url: `/api/data/bijouterie/minorAccessory`,
        method: 'POST',
        data,
    }).then((res) => res.data as iAccessoryDana[]);
};
export const getBijouterieLeftovers = (params: {
    workpieceTypeId?: string | number;
    sizeRangeId?: string | number;
    colorId?: string | number;
}) => {
    return axios({
        url: `/api/data/bijouterie/leftovers`,
        method: 'GET',
        params,
    }).then((res) => res.data as iDataTable[]);
};
export const postDataBijouterie = (data: {
    bijouterieArticleId: number;
    widthIn?: number;
    widthOut?: number;
    moneyIn?: number;
    moneyOut?: number;
    countItemsIn?: number;
    countItemsOut?: number;
    pp?: number;
}) => {
    return axios({
        url: `/api/data/bijouterie/dataBijouterie`,
        method: 'POST',
        data,
    }).then((res) => res.data as iDataTable[]);
};

export const getDataBijouterie = () => {
    return axios({
        url: `/api/data/bijouterie/dataBijouterie`,
        method: 'GET',
    }).then((res) => res.data as iBijouterie[]);
};
export const getLocks = (params: { id: number }) => {
    return axios({
        url: `/api/data/bijouterie/locks`,
        method: 'GET',
        params,
    }).then((res) => res.data as iLock[]);
};
export const getBigouterieBridge = (params: { articleId: number }) => {
    return axios({
        url: `/api/data/bijouterie/bridge`,
        method: 'GET',
        params,
    }).then((res) => res.data as iBigouterueBridje[]);
};
