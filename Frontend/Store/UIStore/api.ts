import axios from 'axios';

export const getVersion = () => {
    return axios({
        url: `/api/getVersion`,
        method: 'GET',
    }).then((res) => res.data);
};

export const getContainerName = () => {
    return axios({
        url: `/api/containerName`,
        method: 'GET',
    }).then((res) => res.data);
};
