import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { OPERATIONS } from '../../../../../Shared/constants';
import { iDataTable } from '../../../../../Shared/Types/interfaces';
import { getMaxPP, postOrderResult } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';
import { tValue } from '../../../Shared/InputNumber';
import * as api from '../api';
import { postDataBijouterie } from '../api';
import { tDataSource } from './useData';

export const useSubmit = (
    setBijouterieId: Dispatch<SetStateAction<number | undefined>>,
) => {
    const { OperationStore } = useStores();
    const getNumber = (v: tValue) => (v ? +v : 0);

    const submit = useMutation(
        async (data: {
            accessoriesData: {
                idAccessory: number;
                countOut: number;
                moneyOut: number;
            };
            dataSource: tDataSource[];
            bijouterie: { id?: number; width: tValue; count: tValue };
        }) => {
            if (!data.bijouterie.id) return;
            //TODO: fix get pp
            //get pp
            const maxPP = await getMaxPP();
            const newPP = maxPP ? maxPP + 1 : undefined;

            //first step
            await api.postMinorAccessory({ ...data.accessoriesData, pp: newPP });
            //seccond step
            const date = moment();
            let totalCode = 0;
            const dataSubmit: iDataTable[] = data.dataSource.map((item) => {
                const code = (item.code / item.width) * getNumber(item.widthOut);
                totalCode += code;
                return {
                    workpieceTypeId: item.workpieceTypeId,
                    typeId: item.typesId,
                    fullModelId: item.fullModelsId,
                    sizeRangeId: item.sizeRangeId,
                    colorId: item.colorId,
                    channelId: item.channelId,
                    gradeId: item.gradeId,
                    stateId: item.stateId,
                    operationId: OPERATIONS.assembleBijouterie.id,
                    countItemsOut: getNumber(item.countItemsOut),
                    widthOut: getNumber(item.widthOut),
                    moneyOut: code,
                    date,
                    pp: newPP,
                };
            });

            await postOrderResult(dataSubmit);

            //third step
            totalCode += data.accessoriesData.moneyOut;
            return postDataBijouterie({
                bijouterieArticleId: data.bijouterie.id,
                widthIn: getNumber(data.bijouterie.width),
                countItemsIn: getNumber(data.bijouterie.count),
                moneyIn: totalCode,
                pp: newPP,
            });
        },
        {
            onSuccess: () => {
                OperationStore.getMaxId();
                setBijouterieId(undefined);
                notification.success({ message: 'Сохранение прошло успешно!' });
            },
            onError: (err) => {
                const error = err as { message: string };
                if (error.message) {
                    notification.error({ message: error.message });
                } else {
                    notification.error({ message: 'Неопознанная ошибка' });
                }
            },
        },
    );
    return { submit };
};
