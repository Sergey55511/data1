import axios from 'axios';
import { iPrintBlank } from '../../../../Shared/Types/interfaces';

export const getPrintBlank = (params: { productionId?: number }) => {
    return axios({
        url: `/api/print/blank`,
        method: 'GET',
        params,
    }).then((res) => res.data as iPrintBlank[]);
};
