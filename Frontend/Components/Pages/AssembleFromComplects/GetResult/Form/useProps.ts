import { useMutation, useQuery } from '@tanstack/react-query';
import { notification } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { OPERATIONS } from '../../../../../../Shared/constants';
import { iData, iDataProduct } from '../../../../../../Shared/Types/interfaces';
import { getManagers } from '../../../../../Store/Lists/api';
import { postAssembleComplect } from '../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../Store/useStores';
import { tValue } from '../../../../Shared/InputNumber';
import { eTypeButton } from '../../useProps';

export interface iProps {
    stateButton: eTypeButton;
    complects?: iDataProduct[];
    minarets: iData[];
    resetRootState: () => void;
    setMinaret: Dispatch<SetStateAction<iData[]>>;
}
export const useProps = ({ complects, minarets, resetRootState }: iProps) => {
    const { loginStore } = useStores();
    const complect = complects ? complects[0] : undefined;

    const [managerId, setManagerId] = useState<number>();
    const [length, setLength] = useState<tValue>(complect?.length);
    const [width, setWidth] = useState<tValue>(complect?.width);
    const minaret = minarets ? minarets[0] : undefined;
    const modelComplect = complect?.model ?? '';
    const fullModelMinaret = minaret?.fullModel ?? '';
    const model = `${fullModelMinaret}/${modelComplect}`;
    const disabled = (() => {
        const getNumber = (v: any) => (v ? +v : 0);
        if (!managerId) return true;
        if (!length) return true;
        if (!width) return true;
        if (getNumber(minaret?.widthOut) > getNumber(minaret?.width)) return true;
        if (getNumber(minaret?.countItemsOut) > getNumber(minaret?.count)) return true;
        if (!minaret?.widthOut) return true;
        if (!minaret.countItemsOut) return true;
        return false;
    })();

    const managers = useQuery(['managers', OPERATIONS.assemble.id], () =>
        getManagers({
            storeId: loginStore.user.storeId,
            active: true,
            operationId: OPERATIONS.assemble.id,
        }),
    );

    const subbmitFetch = useMutation(
        () =>
            postAssembleComplect({ complect, minaret, model, length, width, managerId }),
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
        complect,
        managers,
        managerId,
        setManagerId,
    };
};
