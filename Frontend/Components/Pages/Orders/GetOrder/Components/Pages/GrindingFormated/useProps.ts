import { notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WORKPIECETYPE } from '../../../../../../../../Shared/constants';
import { round } from '../../../../../../../../Shared/Helpers';
import { iData, iField } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import {
    getTotalSum,
    validation,
    sendData,
    getCodeOneItem,
    checkDuplicate,
} from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { tValue } from '../../../../../../Shared/InputNumber';
import { useKeyArrow } from '../../Shared/Hooks/useKeyArrow';

export interface iState {
    sizeRange: iField;
    widthIn: iField;
    duplicate?: boolean;
}
export interface iProps {
    record: iData;
    stateId: number;
    workpiecetypeId: number;
}

export const useProps = ({ record, stateId, workpiecetypeId }: iProps) => {
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const { OperationStore } = useStores();
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [state, setState] = useState<iState[]>([]);
    const [defect, setDefect] = useState<tValue>(undefined);
    const [losses, setLosses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();

    const router = useRouter();

    const removeRow = (index: number) => {
        setState((prev) => prev.filter((_, i) => i != index));
    };

    useEffect(() => {
        const totalSum = getTotalSum(state);
        let res =
            (record?.widthOut || 0) -
            totalSum -
            (defect ? +defect : 0) -
            (moveBack ? +moveBack : 0);
        res = isNaN(res) ? 0 : res;
        res = round(res);
        setLosses(res);
    }, [state, defect, moveBack]);

    const onChange = (
        v: string | number,
        index: number,
        fieldName: keyof Omit<iState, 'duplicate'>,
    ) => {
        setState((prev) => {
            prev[index][fieldName].value = v;
            return [...prev];
        });
    };

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    sizeRange: new Field('sizeRangeId', 'Размерный ряд'),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                },
            ];
            return res;
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

        const codeOneItem = getCodeOneItem({
            recordCode: record.code,
            recordWidth: record.width,
            moveBack,
            totalSum,
        });

        const data: iData[] = state.map((item) => ({
            ...record,
            date,
            workpieceTypeId: workpiecetypeId,
            sizeRangeId: +item.sizeRange.value,
            widthOut: undefined,
            widthIn: +item.widthIn.value!,
            stateId,
            moneyIn: item.widthIn.value ? codeOneItem * +item.widthIn.value : 0,
        }));

        sendData({
            data,
            record,
            setIsLoading,
            postOrderResult: OperationStore.postOrderResult,
            router,
            defect,
            losses,
            moveBack,
        });
    };

    const copyRow = (index: number) => {
        setState((prev) => {
            const elem: iState = JSON.parse(JSON.stringify(prev[index]));
            elem.widthIn.value = '';
            prev.splice(index + 1, 0, elem);
            return [...prev];
        });
    };

    const stateDuplicate: iState[] = checkDuplicate(state);

    return {
        subbmitHandler,
        addRowHandler,
        setMoveBack,
        moveBack,
        setDefect,
        defect,
        losses,
        isLoading,
        state: stateDuplicate,
        onChange,
        copyRow,
        removeRow,
        date,
        setDate,
        keyArrowHandlers: { onKeyDown, onFocus, refHandler },
    };
};
