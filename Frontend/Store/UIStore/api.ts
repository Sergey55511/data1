import axios from 'axios';

export const getVersion = () => {
    return axios({
        url: `/api/getVersion`,
        method: 'GET',
    }).then((res) => res.data);
};