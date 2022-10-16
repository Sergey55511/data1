import axios from 'axios';
import { iData, iDataTable } from '../../../Shared/Types/interfaces';

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
export const mixing = (data: { data: iDataTable[]; storeId: number; maxId: number }) => {
    return axios({
        url: `/api/data/mixing`,
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
