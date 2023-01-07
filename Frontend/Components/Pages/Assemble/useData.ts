import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { OPERATIONS, STATE, WORKPIECETYPE } from '../../../../Shared/constants';
import { iData } from '../../../../Shared/Types/interfaces';
import { moveToWork, postOrderResult } from '../../../Store/OperationStore/Api';
import { useStores } from '../../../Store/useStores';
import { getLosseObject, prepareDataTable } from '../../Helpers';
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

    const moveOutProfitHandler = async (rows: iData[]) => {
        const dataProfit = rows.map((item) => {
            const res = prepareDataTable(item);
            const moneyOut = getCode(item);
            res.userId = loginStore.user.id;
            res.managerId = getNumber(state.manager.value);
            res.storeId = loginStore.user.storeId;
            res.moneyOut = moneyOut;
            res.widthOut = getNumber(res.widthOut);
            res.defect = undefined;
            res.countItemsOut = getNumber(res.countItemsOut);
            res.operationId = OPERATIONS.assemble.id;
            return res;
        });

        return await moveToWork({
            data: dataProfit,
            maxId,
            storeId,
            isSetNewPP: true,
            isSetArticleId: true,
        });
    };

    const moveOutDefectHandler = async ({
        rows,
        pp,
        articleId,
    }: {
        rows: iData[];
        pp?: number;
        articleId?: number;
    }) => {

        const dataDefect = rows
            .filter((item) => item.defect)
            .map((item) => {
                const res = prepareDataTable(item);
                res.userId = loginStore.user.id;
                res.managerId = getNumber(state.manager.value);
                res.pp = pp;
                res.storeId = loginStore.user.storeId;
                res.moneyOut = undefined;
                res.widthOut = getNumber(item.defect);
                res.countItemsOut = getNumber(res.countItemsOut);
                res.operationId = OPERATIONS.assemble.id;
                return res;
            });

        const res = await moveToWork({
            data: dataDefect,
            maxId,
            storeId,
            isSetNewPP: false,
            isSetArticleId: false,
        });

        res.pp = pp;
        res.articleId = articleId;
        return res;
    };

    const getResultHandler = async ({
        rows,
        pp,
        articleId,
    }: {
        rows: iData[];
        pp?: number;
        articleId?: number;
    }) => {
        const code = rows.reduce((res, item) => (res += getCode(item)), 0);

        const data: iData[] = [
            {
                model,
                pp,
                articleId,
                operationId: OPERATIONS.assemble.id,
                userId: loginStore.user.id,
                managerId: getNumber(state.manager.value),
                widthIn: getNumber(state.widthIn.value),
                countItemsIn: getNumber(state.countItemIn.value),
                stateId: STATE.createdProduct.id,
                moneyIn: code,
            },
        ];

        const defectValue = rows.reduce(
            (res, item) => (res += getNumber(item.defect) ?? 0),
            0,
        );

        const dataLosses = {
            ...data[0],
            model: undefined,
            countItemsIn: undefined,
            articleId: undefined,
        };

        if (defectValue) {
            data.push(getLosseObject(dataLosses, WORKPIECETYPE.defect.id, defectValue));
        }

        if (state.losses.value) {
            data.push(
                getLosseObject(dataLosses, WORKPIECETYPE.losses.id, +state.losses.value),
            );
        }

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

    const submitHandler = useMutation(moveOutProfitHandler, {
        onSuccess: (res, rows) => {
            moveOutDefect.mutate({ rows, pp: res.pp, articleId: res.articleId });
        },
        onError: () => {
            notification.error({
                message: 'Ошибка',
                description: 'Свяжитель с администратором',
            });
        },
    });

    const moveOutDefect = useMutation(moveOutDefectHandler, {
        onSuccess: (_, res) => {
            getResult.mutate({ rows: res.rows, pp: res.pp, articleId: res.articleId });
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
