import { notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { patchManager } from '../../../../../../../Store/Lists/api';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type PropsFoo = ArgumentTypes<typeof patchManager>;

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
