import { useMutation, useQuery } from '@tanstack/react-query';
import { notification } from 'antd';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OPERATIONS } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
import * as api from '../../../../../Store/Lists/api';
import { getMaxLot, postNewItems } from '../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../Store/useStores';
import { getTotalSum, validation } from '../../../../Helpers';
import { iState } from './useProps';

export const useData = (
    resetState: () => void,
    setIsValidated: Dispatch<SetStateAction<boolean>>,
) => {
    const { loginStore, OperationStore } = useStores();

    const maxLot = useQuery(['maxLot', loginStore.user.storeId], getMaxLot, {
        enabled: !!loginStore.user.storeId,
    });

    const submitMutation = useMutation(
        ({
            state,
            setState,
        }: {
            state: iState[];
            setState: Dispatch<SetStateAction<iState[]>>;
        }) => {
            setIsValidated(true);
            const date = moment();
            const errorNote = () => {
                notification.error({
                    message: 'Ошибка!',
                    description: 'Не верно заполнены поля!',
                });
            };
            if (!state.length) {
                errorNote();
                throw { error: 'error count row' };
            }

            const isError = validation(setState);

            if (isError) {
                errorNote();
                throw { error: 'validation error' };
            }

            const totalSum = getTotalSum(state);
            if (!totalSum) {
                errorNote();
                throw { error: 'error total sym' };
            }
            const getNumber = (v: any) => (v ? +v : undefined);
            const data: iData[] = state.map((item) => ({
                date,
                workpieceTypeId: getNumber(item.workpieceTypeId.value),
                gradeId: getNumber(item.gradeId.value),
                colorId: getNumber(item.colorId.value),
                sizeRangeId: getNumber(item.sizeRangeId.value),
                widthIn: getNumber(item.widthIn.value),
                stateId: getNumber(item.stateId.value),
                widthInDocument: getNumber(item.widthInDocument.value),
                moneyIn: getNumber(item.moneyIn.value),
                lengthId: getNumber(item.lengthId.value),
                channelId: getNumber(item.channelId.value),
                typeId: getNumber(item.typeId.value),
                userId: loginStore.user.id,
                storeId: loginStore.user.storeId,
                operationId: OPERATIONS.purchase.id,
            }));

            return postNewItems(data);
        },
        {
            onSuccess: () => {
                notification.success({
                    message: 'Сохранение прошло успешно',
                });
                OperationStore.getMaxLot();
                resetState();
            },
        },
    );

    return {
        submitMutation,
        maxLot,
    };
};
