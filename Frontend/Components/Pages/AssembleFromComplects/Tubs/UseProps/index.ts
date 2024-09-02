import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { postAssembleComplect } from '../../../../../Store/OperationStore/Api';
import { useProps as useRootProps } from '../../useProps';
import { subbmitHandler } from './subbmitHandler';
import { extructData } from './extructData';

export const useProps = (props: ReturnType<typeof useRootProps>) => {
    const subbmitMutation = useMutation(() => subbmitHandler(props), {
        onSuccess: () => {
            notification.success({ message: 'Сборка прошла умпешно' });
            props.resetRootState();
            props.setLength(undefined);
            props.setWidth(undefined);
        },
        onError: (err) => {
            const error = err as Error;
            const description = error.message || 'Свяжитель с администратором';
            notification.error({
                message: 'Ошибка',
                description,
            });
        },
    });
    return { subbmitMutation };
};
