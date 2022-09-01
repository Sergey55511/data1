import axios from 'axios';

export const getOperations = (storeId: number) => {
    return axios({
        url: `/api/operations?storeId=${storeId}`,
        method: 'GET',
    }).then((res) => res.data);
};
export const leftovers = () => {
    return axios({
        url: `/api/leftovers`,
        method: 'GET',
    }).then((res) => res.data);
};
