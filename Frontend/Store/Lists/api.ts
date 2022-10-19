import axios from 'axios';
import { iDataTable } from '../../../Shared/Types/interfaces';

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
export const getOperations = (storeId: number, stateId: number) => {
    return axios({
        url: `/api/list/operations?storeId=${storeId}&stateId=${stateId}`,
        method: 'GET',
    }).then((res) => res.data);
};

export const getGrades = (storeId: number) => {
    return axios({
        url: `/api/list/grades?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getTypes = (storeId: number) => {
    return axios({
        url: `/api/list/types?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getColors = (storeId: number) => {
    return axios({
        url: `/api/list/colors?storeId=${storeId}`,
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
export const getWorkpieceType = () => {
    return axios({
        url: '/api/list/workpieceType',
        method: 'GET',
    }).then((res) => res.data);
};
export const getLength = () => {
    return axios({
        url: '/api/list/length',
        method: 'GET',
    }).then((res) => res.data);
};
export const getLengthBySize = (sizeRangeId: number) => {
    return axios({
        url: `/api/list/length?sizeRangeId=${sizeRangeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getRecipient = (storeId?: number) => {
    const patams = storeId ? `?storeId=${storeId}` : '';
    return axios({
        url: `/api/list/recipient${patams}`,
        method: 'GET',
    }).then((res) => res.data);
};

export const postRecipient = (data: { recipient: string }[]) => {
    return axios({
        url: `/api/list/recipient`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
