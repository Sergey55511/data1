import { notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { patchManager } from '../../../../../../../Store/Lists/api';

type PropsFoo = Parameters<typeof patchManager>;

export const usePatchManager = (refetch: () => void) => {
    return useMutation((data: PropsFoo[0]) => patchManager(data), {
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
