import { notification } from 'antd';
import { useMutation } from 'react-query';
import { postManager, postManagerOperations } from '../../../../../../../Store/Lists/api';

export const useAddManager = (refetch: () => void) => {
    return useMutation((data: { name: string; storeId: number }) => postManager(data), {
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
