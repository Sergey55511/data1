import { useEffect, useState } from 'react';
import { Field } from '../../../../Helpers/classes';
import { tValue } from '../../../../Shared/InputNumber';
import { useData } from './useData';

class State {
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
    const [model, setModel] = useState('');
    const [state, setState] = useState(new State());

    useEffect(() => {
        setModel('');
    }, [state]);

    const setStateHandler = (key: keyof State, value: any) => {
        setState((prev) => {
            prev[key].value = value;
            return { ...prev };
        });
    };

    const getValue = (value?: string) => (value ? +value : undefined);

    const getSelectProps = (field: keyof State) => ({
        placeholder: state[field].placeholder,
        onChange: (v: any) => setStateHandler(field, v),
        value: getValue(state[field].value),
    });

    const data = useData();

    return { model, state, setStateHandler, getValue, getSelectProps, data };
};
