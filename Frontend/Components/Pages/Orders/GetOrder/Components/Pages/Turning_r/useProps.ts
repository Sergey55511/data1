import { useEffect, useState } from 'react';
import { iData, iField } from '../../../../../../../../Shared/Types/interfaces';
import { tValue } from '../../../../../../Shared/InputNumber';
import { getTotalSum } from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { usePostData } from './Components/Hooks/usePostData';
import { OPERATIONS } from '../../../../../../../../Shared/constants';
import { round } from '../../../../../../../../Shared/Helpers';
import moment from 'moment';
import { useKeyArrow } from '../../Shared/Hooks/useKeyArrow';

export interface iState {
    stateId: iField;
    workpieceTypeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
    duplicate: boolean;
}

export interface iProps {
    record: iData;
    stateId: number;
    isShowState?: boolean;
    operationId: number;
}

export const useProps = ({ record, operationId, stateId }: iProps) => {
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();
    const [state, setState] = useState<iState[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [defect, setDefect] = useState<tValue>(undefined);
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const postData = usePostData();

    const checkDuplicate = (state: iState[]): iState[] => {
        let rows = state.map((item, index) => {
            const itemString = JSON.stringify({
                stateId: item.stateId,
                workpieceTypeId: item.workpieceTypeId,
                gradeId: item.gradeId,
                colorId: item.colorId,
                sizeRangeId: item.sizeRangeId,
            });
            return { index, itemString, count: 0 };
        });

        rows.forEach((item) => {
            const find = rows.filter((itm) => itm.itemString == item.itemString);
            if (!find[0].count) {
                const count = find.length;
                find.forEach((itm) => (itm.count = count));
            }
        });

        return state.map((item, index) => {
            if (rows[index].count > 1) {
                item.duplicate = true;
            } else {
                item.duplicate = false;
            }
            return { ...item };
        });
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
    }, [state, moveBack, defect]);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const newRow: iState = {
                stateId: new Field('stateId', 'Состояние'),
                workpieceTypeId: new Field('workpieceTypeId', 'Тип загатовки'),
                gradeId: new Field('gradeId', 'Сорт'),
                colorId: new Field('colorId', 'Цвет'),
                sizeRangeId: new Field('sizeRangeId', 'Размерный ряд'),
                widthIn: new Field('widthIn', 'Вес гр.'),
                duplicate: false,
            };
            newRow.stateId.value = stateId;
            const res: iState[] = [...prev, newRow];
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

    const subbmitHandler = () => {
        postData?.mutate({
            state,
            setState,
            losses,
            record,
            defect,
            moveBack,
            date,
        });
    };

    const data = checkDuplicate(state);

    return {
        subbmitHandler,
        addRowHandler,
        setMoveBack,
        defect,
        setDefect,
        moveBack,
        losses,
        postData,
        date,
        setDate,
        data,
        removeRow,
        copyRow,
        setState,
        operationId,
        onKeyDown,
        onFocus,
        refHandler,
    };
};
