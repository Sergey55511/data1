import axios from 'axios';
import { iNewItems } from '../../../Shared/Types/interfaces';

export const getOperations = (storeId: number) => {
    return axios({
        url: `/api/list/operations?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const leftovers = (storeId: number) => {
    return axios({
        url: `/api/leftovers?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getMaxLot = () => {
    return axios({
        url: `/api/Data/getMaxLot`,
        method: 'GET',
    }).then((res) => res.data.lot);
};
export const postNewItems = (data: iNewItems[]) => {
    return axios({
        url: `/api/Data/newItems`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const getProductions = (storeId: number) => {
    return axios({
        url: `/api/list/productions?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const postProductions = (data: { description: string; storeId: number }) => {
    return axios({
        url: `/api/list/productions`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
