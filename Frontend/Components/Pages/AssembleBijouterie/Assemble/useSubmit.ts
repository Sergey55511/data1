import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { OPERATIONS } from '../../../../../Shared/constants';
import {
    iBigouterueBridje,
    iData,
    iDataTable,
} from '../../../../../Shared/Types/interfaces';
import { postOrderResult } from '../../../../Store/OperationStore/Api';
import { getCodeOneItem, getTotalSum, prepareSubbmitData } from '../../../Helpers';
import { tValue } from '../../../Shared/InputNumber';
import * as api from '../api';
import { tDataSource } from './useData';

export const useSubmit = () => {
    const getNumber = (v: tValue) => (v ? +v : 0);

    const submit = useMutation(
        async (data: {
            accessoriesData: {
                idAccessory: number;
                countOut: number;
            };
            dataSource: tDataSource[];
        }) => {
            //first step
            await api.postMinorAccessory(data.accessoriesData);
            //seccond step
            const date = moment();
            const dataSubmit: iDataTable[] = data.dataSource.map((item) => {
                const code = (item.code / item.width) * getNumber(item.widthOut);
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
                };
            });

            await postOrderResult(dataSubmit);

            //third step
        },
    );
    return { submit };
};
