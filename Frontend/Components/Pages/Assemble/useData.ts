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

    const getCode = (item: iData) => {
        const code = item.code || 0;
        return (
            (code / (item.width || code)) * ((item.widthOut || 0) + (item.defect || 0))
        );
    };

    const moveOutHandler = async (rows: iData[]) => {
        const data = rows.map((item) => {
            const res = prepareDataTable(item);
            const moneyOut = getCode(item);
            res.moneyOut = moneyOut;
            res.widthOut = getNumber(res.widthOut);
            res.defect = getNumber(res.defect);
            res.countItemsOut = getNumber(res.countItemsOut);
            res.operationId = OPERATIONS.assemble.id;
            return res;
        });

        return await moveToWork({ data, maxId, storeId, isSetNewPP: true });
    };

    const getResultHandler = async ({ rows, pp }: { rows: iData[]; pp?: number }) => {
        const code = rows.reduce((res, item) => (res += getCode(item)), 0);

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

    const getResult = useMutation(getResultHandler, {
        onSuccess: () => {
            resetState();
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
        onSuccess: (res, rows) => {
            getResult.mutate({ rows, pp: res.pp });
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
