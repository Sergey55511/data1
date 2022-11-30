import { notification } from 'antd';
import { useMutation, useQuery } from 'react-query';
import { getOperations } from '../../../../../../../../../../../Store/Lists/api';

export const useManagerOperations = (storeId: number, managerId: number) => {
    return useQuery(
        ['useManagerOperations', managerId],
        () => getOperations(storeId, undefined, managerId),
        {
            enabled: !!storeId,
        },
    );
};

export const useAddOperation = () => {
    return useMutation(() => console.log('hello'), {
        onSuccess: () => {
            notification.success({ message: 'Успешно' });
        },
        onError: () => {
            notification.error({
                message: 'Ошибка',
                description: 'Свяжитель с администратором',
            });
        },
    });
};
