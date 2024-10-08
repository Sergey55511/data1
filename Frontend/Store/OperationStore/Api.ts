import axios from 'axios';
import {
    iAssembleTakeApartData,
    iData,
    iDataProduct,
    iDataProductTable,
    iDataTable,
    iProductions,
} from '../../../Shared/Types/interfaces';
import { tValue } from '../../Components/Shared/InputNumber';

export const leftovers = (storeId: number) => {
    return axios({
        url: `/api/data/leftovers?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data as iData[]);
};

export const dataOptimization = () => {
    return axios({
        url: `/api/data/optimization`,
        method: 'GET',
    }).then((res) => res.data as iData[]);
};

export const leftoversExcel = () => {
    return axios({
        url: `/api/data/leftovers/excel`,
        responseType: 'blob',
        method: 'GET',
    }).then((res) => res.data);
};
export const ordersExcel = () => {
    return axios({
        url: `/api/data/orders/excel`,
        responseType: 'blob',
        method: 'GET',
    }).then((res) => res.data);
};

interface iPropsListOperation {
    start: moment.Moment;
    end: moment.Moment;
    lot?: number;
    pp?: number;
    operationId?: number;
    numDocument?: string;
    productionId?: number;
}

export const postAssembleComplect = (data: {
    complect?: iDataProduct;
    complectItems: iData[];
    model: string;
    length: tValue;
    width: tValue;
}) => {
    return axios({
        url: `/api/dataproduct/complect`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const listOperations = (params: iPropsListOperation) => {
    return axios({
        url: `/api/data/reports/listOperations`,
        method: 'GET',
        params,
    }).then((res) => res.data as iData[]);
};
export const listOperationsExcel = (params: iPropsListOperation) => {
    return axios({
        url: `/api/data/reports/listOperationsExcel`,
        method: 'GET',
        responseType: 'blob',
        params,
    }).then((res) => res.data);
};
export const listMoveInDocument = (params: {
    start: moment.Moment;
    end: moment.Moment;
    lot?: number;
}) => {
    return axios({
        url: `/api/data/reports/moveInDocument`,
        method: 'GET',
        params,
    }).then((res) => res.data as iData[]);
};

export const leftoversAssemble = (
    storeId: number,
    stateId: number[],
    workpieceTypeId?: number,
) => {
    return axios({
        url: `/api/data/leftovers/assemble`,
        method: 'GET',
        params: { storeId, stateId, workpieceTypeId },
    }).then((res) => res.data as iData[]);
};

export const assembleTakeApart = (data: iAssembleTakeApartData) => {
    return axios({
        url: `/api/dataproduct/takeapart`,
        method: 'POST',
        data,
    }).then((res) => res.data as iData[]);
};

export const getOrders = (storeId: number) => {
    return axios({
        url: `/api/data/orders?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const getOrdersGetOut = (storeId: number) => {
    return axios({
        url: `/api/data/orders/getOut?storeId=${storeId}`,
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
export const getMaxPP = () => {
    return axios({
        url: `/api/data/getMaxPP`,
        method: 'GET',
    }).then((res) => res.data as number | undefined);
};

export const getShared = (storeId: number) => {
    return axios({
        url: `/api/data/shared?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};

export const getMoveIn = (storeId: number, numDocument: string) => {
    return axios({
        url: `/api/data/shared/getMoveIn`,
        method: 'GET',
        params: { storeId, numDocument },
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
        data: { data },
    }).then((res) => res.data);
};
export const moveToWork = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
    isSetNewPP?: boolean;
    isSetArticleId?: boolean;
}) => {
    return axios({
        url: `/api/data/moveToWork`,
        method: 'POST',
        data,
    }).then((res) => res.data as { count?: number; pp?: number; articleId?: number });
};

export const mixingProduction = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
}) => {
    return axios({
        url: `/api/data/mixing/production`,
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
export const mixingState = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
}) => {
    return axios({
        url: `/api/data/mixing/state`,
        method: 'POST',
        data,
    }).then((res) => res.data);
};

export const inventory = (data: {
    data: iDataTable[];
    storeId: number;
    maxId: number;
}) => {
    return axios({
        url: `/api/data/inventory`,
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

export const getDataProductLeftovers = (storeId: number, workpieceTypeId?: number) => {
    return axios({
        url: `/api/dataproduct/leftovers`,
        method: 'GET',
        params: { storeId, workpieceTypeId },
    }).then((res) => res.data as iDataProduct[]);
};

export const getDataProductExcel = () => {
    return axios({
        url: `/api/dataproduct/excel`,
        responseType: 'blob',
        method: 'GET',
    }).then((res) => res.data);
};

export const getData = (params: { pp?: number }) => {
    return axios({
        url: `/api/data`,
        method: 'GET',
        params,
    }).then((res) => res.data as iData[]);
};
export const getDataProduct = (params: { articleId?: number }) => {
    return axios({
        url: `/api/dataproduct`,
        method: 'GET',
        params,
    }).then((res) => res.data as iDataProduct[]);
};
export const postDataProduct = (data: iDataProductTable[]) => {
    return axios({
        url: `/api/dataproduct`,
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
export const patchProductions = (data: iProductions) => {
    return axios({
        url: `/api/list/productions`,
        method: 'PATCH',
        data,
    }).then((res) => res.data);
};
export const getOrder = (pp: number) => {
    return axios({
        url: `/api/data/orders/order?pp=${pp}`,
        method: 'GET',
    }).then((res) => res.data);
};
