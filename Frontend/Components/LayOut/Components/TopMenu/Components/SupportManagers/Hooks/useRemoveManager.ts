import { notification } from 'antd';
import { useMutation } from 'react-query';
import { removeManager } from '../../../../../../../Store/Lists/api';

export const useRemoveManager = (refetch: () => void) => {
    return useMutation((data: { managerId: number }) => removeManager(data), {
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
    });
};
