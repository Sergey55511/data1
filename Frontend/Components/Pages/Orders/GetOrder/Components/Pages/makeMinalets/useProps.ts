import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { iData, iField } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { tValue } from '../../../../../../Shared/InputNumber';
import { getTotalSum, sendData, validation } from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { round } from '../../../../../../../../Shared/Helpers';

export interface iState {
    workpieceType: iField;
    fullModel: iField;
    profile: iField;
    model: iField;
    sizeRangeModel: iField;
    grade: iField;
    color: iField;
    widthIn: iField;
}

export const useProps = ({ record, stateId }: { record: iData; stateId: number }) => {
    const { OperationStore, loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {}, [loginStore.user.storeId]);

    useEffect(() => {
        const totalSum = getTotalSum(state);
        let res = (record?.widthOut || 0) - totalSum - (moveBack ? +moveBack : 0);
        res = isNaN(res) ? 0 : res;
        res = round(res);
        setLosses(res);
    }, [state, moveBack]);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    workpieceType: new Field('workpieceTypeId', 'Тип заготовки'),
                    fullModel: new Field('fullModelId', 'Модель заготовки'),
                    profile: new Field('profileId', 'Профиль'),
                    model: new Field('modelId', 'Модель'),
                    sizeRangeModel: new Field('sizeRangeModelId', 'Размер'),
                    grade: new Field('gradeId', 'Сорт'),
                    color: new Field('colorId', 'Цвет'),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                },
            ];
            return res;
        });
    };

    const removeRow = (index: number) => {
        setState((prev) => prev.filter((_, i) => i != index));
    };

    const copyRow = (index: number) => {
        setState((prev) => {
            const elem: iState = JSON.parse(JSON.stringify(prev[index]));
            elem.widthIn.value = '';
            prev.splice(index + 1, 0, elem);
            return [...prev];
        });
    };

    const subbmitHandler = async () => {
        const errorNote = () => {
            notification.error({
                message: 'Ошибка!',
                description: 'Не верно заполнены поля!',
            });
        };
        if (!state.length) {
            errorNote();
            return;
        }

        const isError = validation(setState);
        if (isError) {
            errorNote();
            return;
        }

        const totalSum = getTotalSum(state);
        if (!totalSum) {
            errorNote();
            return;
        }
        if (losses < 0) {
            errorNote();
            return;
        }
        const code = record.code ? record.code * -1 : 0;
        const codeOneItem = record.width ? code / totalSum : 0;
        const data: iData[] = state.map((item) => ({
            ...record,
            colorId: item.color.value ? +item.color.value : undefined,
            widthOut: undefined,
            widthIn: +item.widthIn.value!,
            fractionId: undefined,
            gradeId: item.grade.value ? +item.grade.value : undefined,
            workpieceType: undefined,
            productionId: undefined,
            stateId,
            moneyIn: item.widthIn.value ? codeOneItem * +item.widthIn.value : 0,
        }));

        sendData({
            data,
            record,
            setIsLoading,
            postOrderResult: OperationStore.postOrderResult,
            router,
            losses,
            moveBack,
        });
    };
    return {
        addRowHandler,
        removeRow,
        copyRow,
        subbmitHandler,
        setMoveBack,
        losses,
        isLoading,
        moveBack,
        state,
        setState,
    };
};
