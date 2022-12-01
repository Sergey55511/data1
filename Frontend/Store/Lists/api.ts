import axios from 'axios';
import { getQueryParams } from '../../../Shared/Helpers';
import {
    iColor,
    iGrade,
    iQueryFilters,
    iSizeRange,
    iWorkpieceType,
    iState,
    iManager,
    iOperation,
} from '../../../Shared/Types/interfaces';

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
    }).then((res) => res.data as iSizeRange[]);
};
export const getFraction = () => {
    return axios({
        url: '/api/list/fraction',
        method: 'GET',
    }).then((res) => res.data);
};

export const postManagerOperations = (data: {
    managerId: number;
    operationId: number;
}) => {
    return axios({
        url: '/api/list/manageroperations',
        method: 'POST',
        data,
    }).then((res) => res.data);
};

export const postManager = (data: { name: string; storeId: number }) => {
    return axios({
        url: '/api/list/managers',
        method: 'POST',
        data,
    }).then((res) => res.data);
};

export const removeManager = (params: { managerId: number }) => {
    return axios({
        url: '/api/list/managers',
        method: 'DELETE',
        params,
    }).then((res) => res.data);
};

export const patchManager = (data: { id: number; params: { [key: string]: any } }) => {
    return axios({
        url: '/api/list/managers',
        method: 'PATCH',
        data,
    }).then((res) => res.data);
};

export const deleteManagerOperations = (data: {
    managerId: number;
    operationId: number;
}) => {
    return axios({
        url: '/api/list/manageroperations',
        method: 'DELETE',
        params: data,
    }).then((res) => res.data);
};

export const getOperations = (
    storeId: number,
    stateId?: number,
    managerId?: number,
    managerOperationsActive?: boolean,
) => {
    return axios({
        url: `/api/list/operations`,
        method: 'GET',
        params: {
            storeId,
            stateId,
            managerId,
            managerOperationsActive,
        },
    }).then((res) => res.data as iOperation[]);
};

export const getStates = (stateId?: number[]) => {
    return axios({
        url: `/api/list/state`,
        method: 'GET',
        params: {
            stateId,
        },
    }).then((res) => res.data as iState[]);
};

export const getGrades = (filters: iQueryFilters) => {
    const params = getQueryParams(filters);
    return axios({
        url: `/api/list/grades${params}`,
        method: 'GET',
    }).then((res) => res.data as iGrade[]);
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
    }).then((res) => res.data as iColor[]);
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

export const getManagers = (params: {
    storeId: number;
    operationId?: number;
    search?: string;
    active?: boolean;
}) => {
    return axios({
        url: `/api/list/managers`,
        method: 'GET',
        params,
    }).then((res) => res.data as iManager[]);
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
    }).then((res) => res.data as iWorkpieceType[]);
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
