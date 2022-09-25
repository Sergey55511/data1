import axios from 'axios';
import { iUser } from '../../../Shared/Types/interfaces';

export const login = (data: iUser) => {
    return axios({
        url: '/api/auth/login',
        method: 'POST',
        data,
    }).then((res) => res.data);
};
export const registration = (data: iUser) => {
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
