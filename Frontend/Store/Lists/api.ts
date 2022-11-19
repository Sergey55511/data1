import axios from 'axios';
import { getQueryParams } from '../../../Shared/Helpers';
import { iQueryFilters } from '../../../Shared/Types/interfaces';

export const getMaterialGroup = () => {
    return axios({
        url: '/api/list/materialGroup',
        method: 'GET',
    }).then((res) => res.data);
};
export const getSizeRange = (filters: iQueryFilters, id?: number) => {
    let params = getQueryParams(filters);
    if (id) {
        if (params) {
            params = `${params}&id=${id}`;
        } else {
            params = `?id=${id}`;
        }
    }
    return axios({
        url: `/api/list/sizeRange${params}`,
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

export const getGrades = (filters: iQueryFilters) => {
    const params = getQueryParams(filters);
    return axios({
        url: `/api/list/grades${params}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getTypes = (filters: iQueryFilters) => {
    const params = getQueryParams(filters);
    return axios({
        url: `/api/list/types${params}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getColors = (filters: iQueryFilters) => {
    const params = getQueryParams(filters);
    return axios({
        url: `/api/list/colors${params}`,
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
export const getWorkpieceType = (filters: iQueryFilters) => {
    const params = getQueryParams(filters);
    return axios({
        url: `/api/list/workpieceType${params}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getLength = (filters: iQueryFilters) => {
    const params = getQueryParams(filters);
    return axios({
        url: `/api/list/length${params}`,
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
