import { notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    color: iField;
    grade: iField;
    widthIn: iField;
}

export const useProps = ({ record, stateId }: { record: iData; stateId: number }) => {
    const { OperationStore, loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [workingHours, setWorkingHours] = useState<string | undefined>('');
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
                    color: new Field('color', 'Цвет', false),
                    grade: new Field('grade', 'Сорт'),
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
        if (!workingHours) {
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
            workingHours: getNumber(workingHours),
            date,
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
        date,
        setDate,
        workingHours,
        setWorkingHours,
    };
};
