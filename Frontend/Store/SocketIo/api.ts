import axios from 'axios';

export const getSocketUrl = () => {
    return axios({
        url: `/api/getsocketurl`,
        method: 'GET',
    }).then((res) => res.data);
};