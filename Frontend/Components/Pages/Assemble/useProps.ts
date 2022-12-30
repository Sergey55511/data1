import { FilterValue } from 'antd/es/table/interface';
import { useState } from 'react';
import { iData } from '../../../../Shared/Types/interfaces';
import { Field } from '../../Helpers/classes';

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
}

export const useProps = () => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [state, setState] = useState(new State());
    const [stateButton, setStateButton] = useState<'assembleCreate' | 'assembleGet'>(
        'assembleCreate',
    );
    const [selectedRows, setSelectedRows] = useState<iData[]>([]);

    const countTasks = selectedRows.length;

    const isDisabled = (() => false)();

    const submitHandler = () => {
        console.log('state', state);
        console.log('selectedRows', selectedRows);
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
    };
};
