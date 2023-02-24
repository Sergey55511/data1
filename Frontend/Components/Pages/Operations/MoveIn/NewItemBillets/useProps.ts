import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { STATE } from '../../../../../../Shared/constants';
import { iField } from '../../../../../../Shared/Types/interfaces';
import { getMaxLot } from '../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../Store/useStores';
import { checkDuplicate, validation } from '../../../../Helpers';
import { Field } from '../../../../Helpers/classes';
import { tValue } from '../../../../Shared/InputNumber';
import { useData } from './useData';

export interface iState {
    stateId: iField;
    workpieceTypeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
    widthInDocument: iField;
    countItemsIn: iField;
    moneyIn: iField;
    lengthId: iField;
    channelId: iField;
    typeId: iField;
    duplicate: boolean;
}

export const useProps = () => {
    const { loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [lot, setLot] = useState<tValue>('');
    const [numDocument, setNumDocument] = useState<tValue>('');
    const [isValidated, setIsValidated] = useState(false);

    const resetState = () => {
        setState([]);
        setLot('');
        setNumDocument('');
    };

    const stateDuplicate: iState[] = checkDuplicate(state);
    const data = useData(resetState, setIsValidated);

    const subbmitHandler = () => {
        data.submitMutation.mutate({
            state,
            setState,
        });
    };

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const newRow: iState = {
                stateId: new Field('stateId', 'Состояние', true, true),
                workpieceTypeId: new Field(
                    'workpieceTypeId',
                    'Тип загатовки',
                    true,
                    true,
                ),
                gradeId: new Field('gradeId', 'Сорт', true, true),
                colorId: new Field('colorId', 'Цвет', true, true),
                sizeRangeId: new Field('sizeRangeId', 'Размерный ряд', true, true),
                widthIn: new Field('widthIn', 'Вес гр.', true, false),
                widthInDocument: new Field(
                    'widthInDocument',
                    'Вес документ',
                    true,
                    false,
                ),
                countItemsIn: new Field('countItemsIn', 'шт.', true, false),
                moneyIn: new Field('moneyIn', 'Стоимость', true, false),
                lengthId: new Field('lengthId', 'Длинна', true, true),
                channelId: new Field('channelId', 'Канал', true, true),
                typeId: new Field('typeId', 'Тип', true, true),
                duplicate: false,
            };
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

    const onChange = (index: number, v: string | number, fieldName: keyof iState) => {
        setState((prev) => {
            const field = prev[index][fieldName] as iField;
            field.value = v;
            return [...prev];
        });
    };

    return {
        lot,
        setLot,
        numDocument,
        setNumDocument,
        addRowHandler,
        state,
        removeRow,
        copyRow,
        onChange,
        subbmitHandler,
        data,
        stateDuplicate,
        isValidated,
    };
};
