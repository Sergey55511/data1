import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { STATE } from '../../../../../../Shared/constants';
import { iField } from '../../../../../../Shared/Types/interfaces';
import { getMaxLot } from '../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../Store/useStores';
import { validation } from '../../../../Helpers';
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
    duplicate: boolean;
}

export const useProps = () => {
    const { loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [lot, setLot] = useState<tValue>('');
    const [numDocument, setNumDocument] = useState<tValue>('');
    const maxLot = useQuery(['maxLot', loginStore.user.storeId], getMaxLot, {
        enabled: !!loginStore.user.storeId,
    });

    const data = useData();

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
                stateId: new Field('stateId', 'Состояние'),
                workpieceTypeId: new Field('workpieceTypeId', 'Тип загатовки'),
                gradeId: new Field('gradeId', 'Сорт'),
                colorId: new Field('colorId', 'Цвет'),
                sizeRangeId: new Field('sizeRangeId', 'Размерный ряд'),
                widthIn: new Field('widthIn', 'Вес гр.'),
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
        maxLot,
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
    };
};
