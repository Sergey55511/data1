import axios from "axios";

export const getOperations = () => {
    return axios({
        url: '/api/operations',
        method: 'GET',
    }).then((res) => res.data);
};