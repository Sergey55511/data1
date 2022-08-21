import axios from 'axios';
import { iLogin } from '../interfaces';

export const login = (data: iLogin) => {
    return axios({
        url: '/api/login',
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const registration = (data: iLogin) => {
    return axios({
        url: '/api/registration',
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const whoami = () => {
    return axios({
        url: '/api/whoami',
        method: 'GET',
    }).then((res) => res.data);
};
