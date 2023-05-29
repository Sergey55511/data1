import axios from 'axios';
import {
    iAccessoryDana,
    iBigouterueBridje,
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
        url: `/api/data/bijouterie/minorAccessoryLeftovers`,
        method: 'GET',
        params: { idAccessory },
    }).then((res) => res.data as iAccessoryDana[]);
};
export const postMinorAccessoryLeftovers = (data: {
    idAccessory: number;
    countIn?: number;
    countOut?: number;
}) => {
    return axios({
        url: `/api/data/bijouterie/minorAccessoryLeftovers`,
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
