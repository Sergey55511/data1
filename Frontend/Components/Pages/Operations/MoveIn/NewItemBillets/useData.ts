import { useMutation, useQuery } from '@tanstack/react-query';
import { notification } from 'antd';
import { Moment } from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OPERATIONS } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { getMaxLot, postNewItems } from '../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../Store/useStores';
import { getTotalSum, validation } from '../../../../Helpers';
import { tValue } from '../../../../Shared/InputNumber';
import { iState } from './useProps';

export const useData = (
    resetState: () => void,
    setIsValidated: Dispatch<SetStateAction<boolean>>,
    lot: tValue,
    numDocument: tValue,
) => {
    const { loginStore, OperationStore } = useStores();

    const maxLot = useQuery(['maxLot', loginStore.user.storeId], getMaxLot, {
        enabled: !!loginStore.user.storeId,
    });

    const submitMutation = useMutation(
        ({
            state,
            date,
            setState,
        }: {
            state: iState[];
            date?: Moment | null;
            setState: Dispatch<SetStateAction<iState[]>>;
        }) => {
            setIsValidated(true);
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
            if (!lot) {
                errorNote();
                throw { error: 'error lot' };
            }
            if (!numDocument) {
                errorNote();
                throw { error: 'error numDocument' };
            }
            if (!date) {
                errorNote();
                throw { error: 'error date' };
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
                lot: getNumber(lot),
                numDocument: numDocument ? `${numDocument}` : undefined,
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
