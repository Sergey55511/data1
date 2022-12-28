import axios from 'axios';
import { iData, iDataTable } from '../../../Shared/Types/interfaces';

export const leftovers = (storeId: number) => {
    return axios({
        url: `/api/data/leftovers?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data as iData[]);
};

export const leftoversAssemble = (storeId: number) => {
    return axios({
        url: `/api/data/leftovers/assemble?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data as iData[]);
};

export const getOrders = (storeId: number) => {
    return axios({
        url: `/api/data/orders?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};

export const postMoveInShared = (data: iDataTable[]) => {
    return axios({
        url: `/api/data/shared`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};

export const getMaxId = (storeId: number) => {
    return axios({
        url: `/api/data/getMaxId?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};

export const getShared = (storeId: number) => {
    return axios({
        url: `/api/data/shared?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};

export const getMoveIn = (storeId: number, numDocument: string) => {
    return axios({
        url: `/api/data/shared/getMoveIn?storeId=${storeId}&numDocument=${numDocument}`,
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
export const moveToWork = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
    isSetNewPP?: boolean;
}) => {
    return axios({
        url: `/api/data/moveToWork`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};

export const mixingLot = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
}) => {
    return axios({
        url: `/api/data/mixing/lot`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};

export const mixingGrade = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
}) => {
    return axios({
        url: `/api/data/mixing/grade`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};

export const mixingSize = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
}) => {
    return axios({
        url: `/api/data/mixing/size`,
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
export const postProductions = (data: { description: string; storeId: number }) => {
    return axios({
        url: `/api/list/productions`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const getOrder = (pp: number) => {
    return axios({
        url: `/api/data/orders/order?pp=${pp}`,
        method: 'GET',
    }).then((res) => res.data);
};
