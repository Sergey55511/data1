import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { OPERATIONS, STATE, WORKPIECETYPE } from '../../../../Shared/constants';
import { iData, iDataProductTable } from '../../../../Shared/Types/interfaces';
import { moveToWork, postDataProduct } from '../../../Store/OperationStore/Api';
import { useStores } from '../../../Store/useStores';
import { getLosseObject, prepareDataTable } from '../../Helpers';
import { printTicket } from '../../Shared/printTicket';
import { State } from './useProps';

export interface iPropsSubmit {
    rows: iData[];
    pp?: number;
    articleId?: number;
    fullModelId?: number;
}
export const useData = (state: State, model: string, resetState: () => void) => {
    const { loginStore, OperationStore } = useStores();
    const storeId = loginStore.user.storeId;
    const maxId = OperationStore.maxId;

    const getValue = (v: any) => (v ? +v : undefined);
    const getNumber = (v: any) => (v ? +v : 0);

    const getCode = (item: iData) => {
        const code = item.code || 0;
        if (!item.width) return 0;

        return (
            (code / (item.width || code)) *
            (getNumber(item.widthOut) + getNumber(item.defect))
        );
    };

    const submitHandlerFoo = async (rows: iData[]) => {
        const fullModetItem = rows.filter(
            (item) =>
                item.workpieceTypeId == WORKPIECETYPE.bead.id ||
                item.workpieceTypeId == WORKPIECETYPE.ball.id,
        );
        if ((fullModetItem?.length ?? 0) > 1) {
            const arrId: number[] = [];
            const isDuplicate = fullModetItem.some((item) => {
                if (item.fullModelId) {
                    if (!arrId.length) {
                        arrId.push(item.fullModelId);
                        return false;
                    }
                    if (arrId.includes(item.fullModelId)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            });
            if (isDuplicate) {
                const error = {
                    message: 'Недопустима сборка из разных моделей',
                };
                notification.error(error);
                throw error;
            }
        }

        const fullModelId = fullModetItem![0].fullModelId;

        const dataProfit = rows.map((item) => {
            const res = prepareDataTable(item);
            const moneyOut = getCode(item);
            res.userId = loginStore.user.id;
            res.managerId = getValue(state.manager.value);
            res.storeId = loginStore.user.storeId;
            res.moneyOut = moneyOut;
            res.widthOut = getValue(res.widthOut);
            res.defect = undefined;
            res.countItemsOut = getValue(res.countItemsOut);
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

        const props: iPropsSubmit = {
            rows,
            pp: moveToWorkRes.pp,
            articleId: moveToWorkRes.articleId || 0,
            fullModelId,
        };

        await moveOutDefectHandler(props);
        await getResultHandler(props);
        await getResultDefects(props);

        return props;
    };

    const moveOutDefectHandler = async ({ rows, pp, articleId }: iPropsSubmit) => {
        const dataDefect = rows
            .filter((item) => item.defect)
            .map((item) => {
                const res = prepareDataTable(item);
                res.userId = loginStore.user.id;
                res.managerId = getValue(state.manager.value);
                res.pp = pp;
                res.storeId = loginStore.user.storeId;
                res.moneyOut = undefined;
                res.widthOut = getValue(item.defect);
                res.countItemsOut = getValue(res.countItemsOut);
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
        fullModelId,
    }: iPropsSubmit) => {
        const code = rows.reduce((res, item) => (res += getCode(item)), 0);

        const data: iDataProductTable[] = [
            {
                storeId: loginStore.user.storeId,
                pp,
                model,
                articleId,
                operationId: OPERATIONS.assemble.id,
                userId: loginStore.user.id,
                managerId: getValue(state.manager.value),
                widthIn: getValue(state.widthIn.value),
                countItemsIn: getValue(state.countItemIn.value),
                stateId: STATE.createdProduct.id,
                moneyIn: code,
                workpieceTypeId: getValue(state.typeBillet.value),
                colorId: getValue(state.color.value),
                length: getValue(state.length.value),
                gradeId: getValue(state.grade.value),
                typeAssembleId: getValue(state.typeAssemble.value),
                fullModelId: getValue(fullModelId),
            },
        ];

        return await postDataProduct(data);
    };

    const getResultDefects = async ({ rows, pp, articleId }: iPropsSubmit) => {
        const defectValue = rows.reduce(
            (res, item) => (res += getValue(item.defect) ?? 0),
            0,
        );

        const data: iData = {
            storeId: loginStore.user.storeId,
            operationId: OPERATIONS.assemble.id,
            userId: loginStore.user.id,
            managerId: getValue(state.manager.value),
            widthIn: getValue(state.widthIn.value),
            stateId: STATE.createdProduct.id,
            moneyIn: undefined,
            workpieceTypeId: getValue(state.typeBillet.value),
            colorId: getValue(state.color.value),
            gradeId: getValue(state.grade.value),
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
            printTicket({
                articleId: res.articleId ?? 0,
                length: getValue(state.length.value) ?? 0,
                model,
                width: getValue(state.widthIn.value) ?? 0,
            });
            resetState();
            notification.success({
                message: 'Успешно',
                description: `Принято изделие № ${res.articleId}`,
            });
        },
        onError: () => {
            notification.error({
                message: 'Ошибка',
                description: 'Свяжитель с администратором',
            });
        },
    });

    return { submitHandler };
};
