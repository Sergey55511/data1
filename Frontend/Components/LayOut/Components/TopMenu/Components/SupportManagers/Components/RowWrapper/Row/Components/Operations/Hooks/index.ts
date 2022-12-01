import { notification } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    deleteManagerOperations,
    getOperations,
    postManagerOperations,
} from '../../../../../../../../../../../../Store/Lists/api';

export const useManagerOperations = (
    storeId: number,
    managerId: number,
    managerOperationsActive?: boolean,
) => {
    return useQuery(
        ['useManagerOperations', managerId, managerOperationsActive],
        () => getOperations(storeId, undefined, managerId, managerOperationsActive),
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

export const useRemoveOperation = (refetch: () => void, fetchManagers: () => void) => {
    return useMutation(
        (data: { managerId: number; operationId: number }) =>
            deleteManagerOperations(data),
        {
            onSuccess: () => {
                refetch();
                fetchManagers();
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
