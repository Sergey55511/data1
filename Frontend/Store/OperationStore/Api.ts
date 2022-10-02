import axios from 'axios';
import { iData, iDataTable } from '../../../Shared/Types/interfaces';

export const getOperations = (storeId: number) => {
    return axios({
        url: `/api/list/operations?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const leftovers = (storeId: number) => {
    return axios({
        url: `/api/data/leftovers?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getMaxLot = () => {
    return axios({
        url: `/api/data/getMaxLot`,
        method: 'GET',
    }).then((res) => res.data.lot);
};
export const postNewItems = <T>(data: T[]) => {
    return axios({
        url: `/api/data/newItems`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const moveToWork = (data: iDataTable) => {
    return axios({
        url: `/api/data/moveToWork`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const postOrderResult = (data: iDataTable[]) => {
    return axios({
        url: `/api/data/orders/order`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const changeNumProduction = (data: iData) => {
    return axios({
        url: `/api/data/changeNumProduction`,
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
export const getUsers = (storeId: number) => {
    return axios({
        url: `/api/list/users?storeId=${storeId}`,
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
export const getOrders = (storeId: number) => {
    return axios({
        url: `/api/data/orders?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getOrder = (pp: number) => {
    return axios({
        url: `/api/data/orders/order?pp=${pp}`,
        method: 'GET',
    }).then((res) => res.data);
};
