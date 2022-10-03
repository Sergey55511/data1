import axios from 'axios';

export const getMaterialGroup = () => {
    return axios({
        url: '/api/list/materialGroup',
        method: 'GET',
    }).then((res) => res.data);
};
export const getSizeRange = () => {
    return axios({
        url: '/api/list/sizeRange',
        method: 'GET',
    }).then((res) => res.data);
};
export const getFraction = () => {
    return axios({
        url: '/api/list/fraction',
        method: 'GET',
    }).then((res) => res.data);
};
export const leftovers = (storeId: number) => {
    return axios({
        url: `/api/data/leftovers?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getOrders = (storeId: number) => {
    return axios({
        url: `/api/data/orders?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getOperations = (storeId: number) => {
    return axios({
        url: `/api/list/operations?storeId=${storeId}`,
        method: 'GET',
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
export const getManagers = (storeId: number, operationId: number) => {
    return axios({
        url: `/api/list/managers?storeId=${storeId}&operationId=${operationId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getStores = () => {
    return axios({
        url: '/api/stores',
        method: 'GET',
    }).then((res) => res.data);
};