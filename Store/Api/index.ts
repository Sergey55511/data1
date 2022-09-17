import axios from 'axios';
import { iLogin } from '../interfaces';

export const login = (data: iLogin) => {
    return axios({
        url: '/api/auth/login',
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const registration = (data: iLogin) => {
    return axios({
        url: '/api/auth/registration',
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const whoami = () => {
    return axios({
        url: '/api/auth/whoami',
        method: 'GET',
    }).then((res) => res.data);
};
export const getStores = () => {
    return axios({
        url: '/api/stores',
        method: 'GET',
    }).then((res) => res.data);
};
