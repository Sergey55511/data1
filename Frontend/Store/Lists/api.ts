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
