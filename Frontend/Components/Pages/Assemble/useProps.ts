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
    manager = new Field('managerId', 'Обязательное поле');
    constructor() {
        this.countItemIn.value = '1';
    }
}

export const useProps = ({ stateResultId }: { stateResultId: number }) => {
    const [model, setModel] = useState('');
    const [errorText, setErrorText] = useState('');
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [state, setState] = useState(new State());
    const [stateButton, setStateButton] = useState<'assembleCreate' | 'assembleGet'>(
        'assembleCreate',
    );

    const [selectedRows, setSelectedRows] = useState<iData[]>([]);

    const countTasks = selectedRows.length;

    const isDisabled = (() => {
        const setError = (value: string) => {
            if (errorText == value) return;
            setErrorText(value);
        };

        const getNumber = (v: any) => (v ? +v : 0);
        if (!selectedRows.length) {
            setError('Не выбрано сырье изделия');
            return true;
        }
        const ttlSum = selectedRows.reduce(
            (res, item) => (res += getNumber(item.widthOut)),
            0,
        );

        // check count items
        for (const item of selectedRows) {
            if (getNumber(item.count)) {
                if (!getNumber(item.countItemsOut)) {
                    setError('Не введено кол-во штук');
                    return true;
                }
                if (
                    getNumber(item.widthOut) + getNumber(item.defect) >
                    getNumber(item.width)
                ) {
                    setError('Расход превышает остаток');
                    return true;
                }
            }
        }

        // check width out is less then total width
        if (getNumber(state.widthIn.value) < ttlSum) {
            setError('Изделие легче выдаваемого сырья');
            return true;
        }
        const someEmpyt = selectedRows.some((item) => !item.widthOut);
        if (someEmpyt) {
            setError('Не введен расход по строке');
            return true;
        }
        if (!state.color.value) {
            setError('Укажите цвет');
            return true;
        }
        if (!state.manager.value) {
            setError('Укажите сотрудника');
            return true;
        }
        if (!state.countItemIn.value) {
            setError('Укажите количество изделий');
            return true;
        }
        if (!state.grade.value) {
            setError('Укажите сорт');
            return true;
        }
        if (!state.length.value) {
            setError('Укажите длинну');
            return true;
        }
        if (!state.typeAssemble.value) {
            setError('Укажите тип сборки');
            return true;
        }
        if (!state.typeBillet.value) {
            setError('Укажите тип изделия');
            return true;
        }
        if (!state.variantAssemble.value) {
            setError('Укажите вариант сборки');
            return true;
        }
        if (!state.widthIn.value) {
            setError('Укажите вес изделия');
            return true;
        }
        if (!state.yarn.value) {
            setError('Укажите нить');
            return true;
        }
        setError('');
        return false;
    })();

    const resetState = () => {
        setStateButton('assembleCreate');
        setState(new State());
        setModel('');
        setSelectedRows([]);
        setErrorText('');
    };

    const data = useData(state, model, resetState, stateResultId);

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
        errorText,
    };
};
