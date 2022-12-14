import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { OPERATIONS, STATE, WORKPIECETYPE } from '../../../../Shared/constants';
import { iData, iDataProductTable } from '../../../../Shared/Types/interfaces';
import { moveToWork, postDataProduct } from '../../../Store/OperationStore/Api';
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

    const submitHandlerFoo = async (rows: iData[]) => {
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

        const moveToWorkRes = await moveToWork({
            data: dataProfit,
            maxId,
            storeId,
            isSetNewPP: true,
            isSetArticleId: true,
        });

        const props = {
            rows,
            pp: moveToWorkRes.pp,
            articleId: moveToWorkRes.articleId,
        };

        await moveOutDefectHandler(props);
        await getResultHandler(props);
        await getResultDefects(props);

        return props;
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

        const data: iDataProductTable[] = [
            {
                storeId: loginStore.user.storeId,
                pp,
                model,
                articleId,
                operationId: OPERATIONS.assemble.id,
                userId: loginStore.user.id,
                managerId: getNumber(state.manager.value),
                widthIn: getNumber(state.widthIn.value),
                countItemsIn: getNumber(state.countItemIn.value),
                stateId: STATE.createdProduct.id,
                moneyIn: code,
                workpieceTypeId: getNumber(state.typeBillet.value),
                colorId: getNumber(state.color.value),
                length: getNumber(state.length.value),
                gradeId: getNumber(state.grade.value),
            },
        ];

        return await postDataProduct(data);
    };

    const getResultDefects = async ({
        rows,
        pp,
        articleId,
    }: {
        rows: iData[];
        pp?: number;
        articleId?: number;
    }) => {
        const defectValue = rows.reduce(
            (res, item) => (res += getNumber(item.defect) ?? 0),
            0,
        );

        const data: iData = {
            storeId: loginStore.user.storeId,
            operationId: OPERATIONS.assemble.id,
            userId: loginStore.user.id,
            managerId: getNumber(state.manager.value),
            widthIn: getNumber(state.widthIn.value),
            stateId: STATE.createdProduct.id,
            moneyIn: undefined,
            workpieceTypeId: getNumber(state.typeBillet.value),
            colorId: getNumber(state.color.value),
            gradeId: getNumber(state.grade.value),
            pp,
            articleId,
        };

        let res: iData[] = [];

        if (defectValue) {
            res = [...res, getLosseObject(data, WORKPIECETYPE.defect.id, defectValue)];
        }

        if (state.losses.value) {
            res = [
                ...res,
                getLosseObject(data, WORKPIECETYPE.losses.id, +state.losses.value),
            ];
        }
        return await moveToWork({
            data: res,
            maxId,
            storeId,
            isSetNewPP: false,
            isSetArticleId: false,
        });
    };

    const submitHandler = useMutation(submitHandlerFoo, {
        onSuccess: (res) => {
            resetState();
            notification.success({
                message: '??????????????',
                description: `?????????????? ?????????????? ??? ${res.articleId}`,
            });
        },
        onError: () => {
            notification.error({
                message: '????????????',
                description: '?????????????????? ?? ??????????????????????????????',
            });
        },
    });

    return { submitHandler };
};
