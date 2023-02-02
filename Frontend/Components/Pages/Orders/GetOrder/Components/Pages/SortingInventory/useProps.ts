import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { WORKPIECETYPE } from '../../../../../../../../Shared/constants';
import { iData, iField } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { tValue } from '../../../../../../Shared/InputNumber';
import {
    getCodeOneItem,
    getTotalSum,
    sendData,
    validation,
} from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { round } from '../../../../../../../../Shared/Helpers';
import moment from 'moment';

export interface iState {
    sizeRange: iField;
    length: iField;
    grade: iField;
    color: iField;
    widthIn: iField;
}
export interface iProps {
    record: iData;
}

export const useProps = ({ record }: iProps) => {
    const { OperationStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [defect, setDefect] = useState<tValue>();
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getNumber = (v: any) => (v ? +v : 0);

    useEffect(() => {
        const totalSum = getTotalSum(state);
        let res =
            getNumber(record?.widthOut) -
            totalSum -
            getNumber(moveBack) -
            getNumber(defect);
        res = isNaN(res) ? 0 : res;
        res = round(res);
        setLosses(res);
    }, [state, moveBack, defect]);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    sizeRange: new Field('sizeRange', 'Размер'),
                    length: new Field('length', 'Длинна'),
                    grade: new Field('grade', 'сорт'),
                    color: new Field('color', 'цвет'),
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

        const getValue = (v: any) => (v ? +v : undefined);

        const data: iData[] = state.map((item) => ({
            ...record,
            date,
            sizeRangeId: getValue(item.sizeRange.value),
            lengthId: getValue(item.length.value),
            widthOut: undefined,
            widthIn: getValue(item.widthIn.value),
            fractionId: undefined,
            colorId: getValue(item.color.value),
            gradeId: getValue(item.grade.value),
            productionId: undefined,
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
            defect,
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
        state,
        removeRow,
        copyRow,
        setState,
        record,
        date,
        setDate,
        defect,
        setDefect,
    };
};
