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
    workpieceType: iField;
    fullModelId: iField;
    fullModelName?: string;
    profile: iField;
    model: iField;
    sizeRangeModel: iField;
    grade: iField;
    color: iField;
    widthIn: iField;
    countIn: iField;
}

export const useProps = ({ record, stateId }: { record: iData; stateId: number }) => {
    const { OperationStore, loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [workingTimeFact, setWorkingTimeFact] = useState<string | undefined>('');
    const [garbage, setGarbage] = useState<tValue>(undefined);
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [defect, setDefect] = useState<tValue>(undefined);
    const [pruning, setPruning] = useState<tValue>(undefined);
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const getIdValue = (value: any) => (value ? +value : undefined);

    useEffect(() => {}, [loginStore.user.storeId]);

    useEffect(() => {
        const getValue = (v?: any) => (v ? +v : 0);
        const totalSum = getTotalSum(state);
        let res =
            getValue(record?.widthOut) -
            getValue(totalSum) -
            getValue(moveBack) -
            getValue(pruning) -
            getValue(garbage) -
            getValue(defect);
        res = isNaN(res) ? 0 : res;
        res = round(res);
        setLosses(res);
    }, [state, record?.widthOut, moveBack, pruning, defect, garbage]);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    workpieceType: new Field('workpieceTypeId', 'Тип заготовки'),
                    fullModelId: new Field('fullModelId', 'Модель заготовки'),
                    profile: new Field('profileId', 'Профиль'),
                    model: new Field('modelId', 'Модель'),
                    sizeRangeModel: new Field('sizeRangeModelId', 'Размер'),
                    grade: new Field('gradeId', 'Сорт'),
                    color: new Field('colorId', 'Цвет'),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                    countIn: new Field('countIn', 'Штук'),
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
            elem.countIn.value = '';
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
        if (!workingTimeFact) {
            errorNote();
            return;
        }

        const codeOneItem = getCodeOneItem({
            recordCode: record.code,
            recordWidth: record.width,
            moveBack,
            pruning,
            totalSum,
        });

        const data: iData[] = state.map((item) => ({
            ...record,
            date,
            workingTimeFact: getIdValue(workingTimeFact),
            widthOut: undefined,
            fractionId: undefined,
            stateId,
            workpieceTypeId: getIdValue(item.workpieceType.value),
            sizeRangeId: getIdValue(item.sizeRangeModel.value),
            lengthId: undefined,
            fullModelId: getIdValue(item.fullModelId.value),
            colorId: getIdValue(item.color.value),
            gradeId: getIdValue(item.grade.value),
            widthIn: getIdValue(item.widthIn.value),
            countItemsIn: getIdValue(item.countIn.value),
            moneyIn: item.widthIn.value ? codeOneItem * +item.widthIn.value : 0,
        }));

        sendData({
            data,
            record,
            setIsLoading,
            postOrderResult: OperationStore.postOrderResult,
            router,
            losses,
            pruning,
            moveBack,
            garbage,
            defect,
            stateId,
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
        garbage,
        setGarbage,
        pruning,
        setPruning,
        defect,
        setDefect,
        date,
        setDate,
        workingTimeFact,
        setWorkingTimeFact,
    };
};
