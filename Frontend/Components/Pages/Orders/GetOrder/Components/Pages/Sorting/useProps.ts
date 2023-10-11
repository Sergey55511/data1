import { notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { round } from '../../../../../../../../Shared/Helpers';
import { iData, iField, iGrade } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import {
    checkDuplicate,
    getCodeOneItem,
    getTotalSum,
    sendData,
    validation,
} from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { tValue } from '../../../../../../Shared/InputNumber';
import { useKeyArrow } from '../../Shared/Hooks/useKeyArrow';
import { getRootLists } from './Components/Hooks';

export interface iState {
    typeId: iField;
    gradeId: iField;
    materialGroupId: iField;
    fractionId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
    duplicate?: boolean;
}

export interface iProps {
    record: iData;
    stateId: number;
    isFraction?: boolean;
    isMaterialGroup?: boolean;
}

export const useProps = ({ record, stateId, isMaterialGroup, isFraction }: iProps) => {
    const { ListsStore, OperationStore, loginStore } = useStores();
    const arrowHandler = useKeyArrow();
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
                    materialGroupId: new Field(
                        'materialGroupId',
                        'Группа сырья',
                        !!isMaterialGroup,
                    ),
                    fractionId: new Field('fractionId', 'Фракция', !!isFraction),
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
            typeId: getNumber(item.typeId.value),
            gradeId: getNumber(item.gradeId.value),
            colorId: getNumber(item.colorId.value),
            sizeRangeId: getNumber(item.sizeRangeId.value),
            widthOut: undefined,
            widthIn: getNumber(item.widthIn.value),
            stateId,
            materialGroupId: getNumber(item.materialGroupId.value),
            fractionId: getNumber(item.fractionId.value),
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
        state: checkDuplicate(state) as iState[],
        grade,
        setState,
        removeRow,
        copyRow,
        arrowHandler,
    };
};
