import { notification } from 'antd';
import { useMutation, useQuery } from 'react-query';
import {
    deleteManagerOperations,
    getOperations,
    postManagerOperations,
} from '../../../../../../../../../../../Store/Lists/api';

export const useManagerOperations = (storeId: number, managerId: number) => {
    return useQuery(
        ['useManagerOperations', managerId],
        () => getOperations(storeId, undefined, managerId),
        {
            enabled: !!storeId,
        },
    );
};

export const useAddOperation = (refetch: () => void) => {
    return useMutation(
        (data: { managerId: number; operationId: number }) => postManagerOperations(data),
        {
            onSuccess: () => {
                refetch();
                notification.success({ message: 'Успешно' });
            },
            onError: () => {
                notification.error({
                    message: 'Ошибка',
                    description: 'Свяжитель с администратором',
                });
            },
        },
    );
};

export const useRemoveOperation = (refetch: () => void) => {
    return useMutation(
        (data: { managerId: number; operationId: number }) => deleteManagerOperations(data),
        {
            onSuccess: () => {
                refetch();
                notification.success({ message: 'Успешно' });
            },
            onError: () => {
                notification.error({
                    message: 'Ошибка',
                    description: 'Свяжитель с администратором',
                });
            },
        },
    );
};