import { useMutation, useQuery } from '@tanstack/react-query';
import { notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../../Shared/Types/interfaces';
import * as api from '../../../../../Store/Lists/api';
import { postOrderResult } from '../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../Store/useStores';
import { getTotalSum, prepareSubbmitData, validation } from '../../../../Helpers';
import { tValue } from '../../../../Shared/InputNumber';
import { ROUTES } from '../../../constants';
import { iState } from './useProps';

export const useData = () => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const workpieceType = useQuery(
        ['workpieceType', storeId],
        () => api.getWorkpieceType({ storeId }),
        { enabled: !!storeId },
    );
    const grade = useQuery(['grade', storeId], () => api.getGrades({ storeId }), {
        enabled: !!storeId,
    });
    const color = useQuery(['color', storeId], () => api.getColors({ storeId }), {
        enabled: !!storeId,
    });
    const sizeRange = useQuery(
        ['sizeRange', storeId],
        () => api.getSizeRange({ storeId }),
        { enabled: !!storeId },
    );

    const router = useRouter();
    const submitMutation = useMutation(
        ({
            state,
            setState,
        }: {
            state: iState[];
            setState: Dispatch<SetStateAction<iState[]>>;
        }) => {
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

            const data: iData[] = state.map((item) => ({
                date,
                workpieceTypeId: +item.workpieceTypeId.value,
                gradeId: +item.gradeId.value,
                colorId: +item.colorId.value,
                sizeRangeId: +item.sizeRangeId.value,
                widthOut: undefined,
                widthIn: +item.widthIn.value!,
                fractionId: undefined,
                materialGroupId: undefined,
                typeId: undefined,
                workpieceType: undefined,
                productionId: undefined,
                stateId: +item.stateId.value,
            }));

            return postOrderResult(data);
        },
        {
            onSuccess: () => {
                notification.success({
                    message: 'Сохранение прошло успешно',
                });
                router.push(ROUTES.newItemBillets);
            },
        },
    );

    return { workpieceType, grade, color, sizeRange, submitMutation };
};
