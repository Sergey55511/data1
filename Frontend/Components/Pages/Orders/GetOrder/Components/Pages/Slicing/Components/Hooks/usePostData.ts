import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { iState } from '../..';
import {
    getTotalSum,
    prepareSubbmitData,
    validation,
} from '../../../../../../../../Helpers';
import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../../../../../../Shared/Types/interfaces';
import { tValue } from '../../../../../../../../Shared/InputNumber';
import { postOrderResult } from '../../../../../../../../../Store/OperationStore/Api';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../../../../../constants';

export const usePostData = () => {
    const router = useRouter();
    return useMutation(
        ({
            state,
            setState,
            losses,
            record,
            garbage,
            defect,
            moveBack,
        }: {
            state: iState[];
            setState: Dispatch<SetStateAction<iState[]>>;
            losses: number;
            record: iData;
            garbage?: tValue;
            defect?: tValue;
            moveBack?: tValue;
        }) => {
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
            if (losses < 0) {
                errorNote();
                throw { error: 'losses less then 0' };
            }
            const code = record.code ? record.code * -1 : 0;
            const codeOneItem = record.width ? code / totalSum : 0;
            const data: iData[] = state.map((item) => ({
                ...record,
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
                moneyIn: item.widthIn.value ? codeOneItem * +item.widthIn.value : 0,
            }));

            const dataTable = prepareSubbmitData({
                record,
                data,
                losses,
                garbage,
                defect,
                moveBack,
            });
            
            return postOrderResult(dataTable);
        },
        {
            onSuccess: () => {
                notification.success({
                    message: 'Сохранение прошло успешно',
                });
                router.push(ROUTES.orders);
            },
        },
    );
};
