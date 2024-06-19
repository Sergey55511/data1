import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useState } from 'react';
import { iData, iDataProduct } from '../../../../../Shared/Types/interfaces';
import { postAssembleComplect } from '../../../../Store/OperationStore/Api';
import { tValue } from '../../../Shared/InputNumber';
import { eTypeButton } from '../useProps';

export interface iProps {
    stateButton: eTypeButton;
    complects?: iDataProduct[];
    minarets: iData[];
    resetRootState: () => void;
}
export const useProps = ({ complects, minarets, resetRootState }: iProps) => {
    const [length, setLength] = useState<tValue>();
    const [width, setWidth] = useState<tValue>();
    const complect = complects ? complects[0] : undefined;
    const minaret = minarets ? minarets[0] : undefined;
    const modelComplect = complect?.model ?? '';
    const fullModelMinaret = minaret?.fullModel ?? '';
    const model = `${fullModelMinaret}/${modelComplect}`;
    const disabled = !(length && width);

    const subbmitFetch = useMutation(
        () => postAssembleComplect({ complect, minaret, model, length, width }),
        {
            onSuccess: () => {
                notification.success({ message: 'Сборка прошла умпешно' });
                resetRootState();
                setLength(undefined);
                setWidth(undefined);
            },
            onError: () => {
                notification.error({
                    message: 'Ошибка',
                    description: 'Свяжитель с администратором',
                });
            },
        },
    );

    const subbmitHandler = () => {
        subbmitFetch.mutate();
    };

    const isLoading = subbmitFetch.isLoading;

    return {
        disabled,
        model,
        length,
        setLength,
        setWidth,
        width,
        subbmitHandler,
        isLoading,
    };
};
