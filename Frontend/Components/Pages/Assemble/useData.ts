import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { OPERATIONS, STATE } from '../../../../Shared/constants';
import { iData } from '../../../../Shared/Types/interfaces';
import { postManagerOperations } from '../../../Store/Lists/api';
import { getMaxId, moveToWork, postOrderResult } from '../../../Store/OperationStore/Api';
import { useStores } from '../../../Store/useStores';
import { prepareDataTable, sendData } from '../../Helpers';
import { State } from './useProps';

export const useData = (state: State, model: string, resetState: () => void) => {
    const { loginStore, OperationStore } = useStores();
    const storeId = loginStore.user.storeId;
    const maxId = OperationStore.maxId;

    const getNumber = (v: any) => (v ? +v : undefined);

    const moveOutHandler = async (rows: iData[]) => {
        const data = rows.map((item) => {
            const res = prepareDataTable(item);
            const code = item.code || 0;
            const moneyOut = (code / (item.width || code)) * (res.widthOut || 0);
            res.moneyOut = moneyOut;
            res.widthOut = getNumber(res.widthOut);
            res.countItemsOut = getNumber(res.countItemsOut);
            res.operationId = OPERATIONS.assemble.id;
            return res;
        });

        return await moveToWork({ data, maxId, storeId, isSetNewPP: true });
    };

    const getResultHandler = async (pp?: number) => {
        const code = 100;
        // const code = record.code ? record.code * -1 : 0;
        const data: iData[] = [
            {
                model,
                pp,
                widthIn: getNumber(state.widthIn.value),
                countItemsIn: getNumber(state.countItemIn.value),
                stateId: STATE.createdProduct.id,
                moneyIn: code,
            },
        ];
        return await postOrderResult(data);
    };

    const onSuccessHandler = async () => {
        await getMaxId(storeId);
        resetState();
    };

    const getResult = useMutation(getResultHandler, {
        onSuccess: () => {
            onSuccessHandler();
            notification.success({ message: 'Успешно' });
        },
        onError: () => {
            notification.error({
                message: 'Ошибка',
                description: 'Свяжитель с администратором',
            });
        },
    });

    const submitHandler = useMutation(moveOutHandler, {
        onSuccess: (res) => {
            getResult.mutate(res.pp);
        },
        onError: () => {
            notification.error({
                message: 'Ошибка',
                description: 'Свяжитель с администратором',
            });
        },
    });
    return { submitHandler, getResult };
};
