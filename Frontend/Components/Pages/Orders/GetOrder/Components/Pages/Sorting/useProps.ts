import { notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { round } from '../../../../../../../../Shared/Helpers';
import { iData, iField, iGrade } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import {
    getCodeOneItem,
    getTotalSum,
    sendData,
    validation,
} from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { tValue } from '../../../../../../Shared/InputNumber';
import { getRootLists } from './Components/Hooks';

export interface iState {
    typeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
}

export interface iProps {
    record: iData;
    stateId: number;
}

export const useProps = ({ record, stateId }: iProps) => {
    const { ListsStore, OperationStore, loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [grade, setGrade] = useState<iGrade[]>([]);
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [losses, setLosses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getRootLists(ListsStore, setGrade, loginStore.user.storeId);
    }, [loginStore.user.storeId]);

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
                    typeId: new Field('typeId', 'Тип'),
                    gradeId: new Field('gradeId', 'Сорт'),
                    colorId: new Field('colorId', 'Цвет'),
                    sizeRangeId: new Field('sizeRangeId', 'Размерный ряд'),
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

        const data: iData[] = state.map((item) => ({
            ...record,
            date,
            typeId: +item.typeId.value,
            gradeId: +item.gradeId.value,
            colorId: +item.colorId.value,
            sizeRangeId: +item.sizeRangeId.value,
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
            losses,
            moveBack,
        });
    };
    return {
        subbmitHandler,
        addRowHandler,
        setMoveBack,
        moveBack,
        losses,
        isLoading,
        date,
        setDate,
        state,
        grade,
        setState,
        removeRow,
    };
};