import { FilterValue } from 'antd/es/table/interface';
import { useState } from 'react';
import { iData } from '../../../../Shared/Types/interfaces';
import { Field } from '../../Helpers/classes';
import { useData } from './useData';

export class State {
    variantAssemble = new Field('variantAssemble', 'Обязательное поле');
    typeBillet = new Field('typeBillet', 'Обязательное поле');
    typeAssemble = new Field('typeAssemble', 'Обязательное поле');
    color = new Field('color', 'Обязательное поле');
    yarn = new Field('yarn', 'Обязательное поле');
    grade = new Field('yarn', 'Обязательное поле');
    length = new Field('length', 'Обязательное поле');
    widthIn = new Field('widthIn', 'Обязательное поле');
    countItemIn = new Field('countItemIn', 'Обязательное поле');
    losses = new Field('losses', 'Обязательное поле');
    constructor() {
        this.countItemIn.value = '1';
        this.typeBillet.value = '1';
    }
}

export const useProps = () => {
    const [model, setModel] = useState('');
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [state, setState] = useState(new State());
    const [stateButton, setStateButton] = useState<'assembleCreate' | 'assembleGet'>(
        'assembleCreate',
    );

    const [selectedRows, setSelectedRows] = useState<iData[]>([]);

    const countTasks = selectedRows.length;

    const isDisabled = (() => {
        const getNumber = (v: any) => (v ? +v : 0);
        if (!selectedRows.length) return true;
        const ttlSum = selectedRows.reduce(
            (res, item) => (res += getNumber(item.widthOut)),
            0,
        );

        // check count items
        for (const item of selectedRows) {
            if (getNumber(item.count)) {
                if (!getNumber(item.countItemsOut)) return true;
            }
        }

        // check width out is less then total width
        if (getNumber(state.widthIn.value) < ttlSum) return true;

        const someEmpyt = selectedRows.some((item) => !item.widthOut);
        if (someEmpyt) return true;

        if (!state.color.value) return true;
        if (!state.countItemIn.value) return true;
        if (!state.grade.value) return true;
        if (!state.length.value) return true;
        if (!state.typeAssemble.value) return true;
        if (!state.typeBillet.value) return true;
        if (!state.variantAssemble.value) return true;
        if (!state.widthIn.value) return true;
        if (!state.yarn.value) return true;
        return false;
    })();

    const resetState = () => {
        setStateButton('assembleCreate');
        setState(new State());
        setModel('');
        setSelectedRows([]);
    };

    const data = useData(state, model, resetState);

    const submitHandler = () => {
        data.submitHandler.mutate(selectedRows);
    };

    return {
        filters,
        setFilters,
        stateButton,
        setStateButton,
        selectedRows,
        setSelectedRows,
        countTasks,
        isDisabled,
        submitHandler,
        state,
        setState,
        model,
        setModel,
        data,
    };
};
