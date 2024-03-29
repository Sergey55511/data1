import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    iData,
    iField,
    iSizeRange,
} from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { tValue } from '../../../../../../Shared/InputNumber';
import {
    checkDuplicate,
    getCodeOneItem,
    getTotalSum,
    sendData,
    validation,
} from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { round } from '../../../../../../../../Shared/Helpers';
import moment from 'moment';
import { useKeyArrow } from '../../Shared/Hooks/useKeyArrow';

export interface iState {
    length: iField;
    grade: iField;
    color: iField;
    widthIn: iField;
    duplicate?: boolean;
}
export interface iProps {
    record: iData;
    stateId: number;
}

export const useProps = ({ record, stateId }: iProps) => {
    const { OperationStore } = useStores();
    const arrowHandler = useKeyArrow();
    const [state, setState] = useState<iState[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
                    length: new Field('length', 'Длинна', true, true),
                    grade: new Field('grade', 'Сорт', true, true),
                    color: new Field('color', 'Цвет', true, true),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                },
            ];
            return res;
        });
    };

    const removeRow = (index: number) => {
        setState((prev) => prev.filter((_, i) => i != index));
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

        const codeOneItem = getCodeOneItem({
            recordCode: record.code,
            recordWidth: record.width,
            moveBack,
            totalSum,
        });

        const getNumber = (v: any) => (v ? +v : undefined);

        const data: iData[] = state.map((item) => ({
            ...record,
            date,
            lengthId: getNumber(item.length.value),
            widthOut: undefined,
            widthIn: getNumber(item.widthIn.value),
            fractionId: undefined,
            gradeId: getNumber(item.grade.value),
            colorId: getNumber(item.color.value),
            workpieceType: undefined,
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

    const copyRow = (index: number) => {
        setState((prev) => {
            const elem: iState = JSON.parse(JSON.stringify(prev[index]));
            elem.widthIn.value = '';
            prev.splice(index + 1, 0, elem);
            return [...prev];
        });
    };

    return {
        subbmitHandler,
        addRowHandler,
        setMoveBack,
        moveBack,
        losses,
        isLoading,
        state: checkDuplicate(state) as iState[],
        removeRow,
        copyRow,
        setState,
        record,
        date,
        setDate,
        arrowHandler,
    };
};
