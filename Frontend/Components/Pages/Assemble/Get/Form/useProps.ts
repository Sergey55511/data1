import { useEffect, useState } from 'react';
import { RESULTASSEMBLE } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
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

export const useProps = (selectedRows: iData[]) => {
    const [model, setModel] = useState('');
    const [state, setState] = useState(new State());

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

    useEffect(() => {
        let res = '';
        if (state.typeBillet.value == `${RESULTASSEMBLE.chaplet.id || ''}`) {
            res = 'TM';
            res += '62'; //взять из модели миналета
            res += 'BA'; //взять из профиля бусины
            res += '16.50'; //взять из размера бусины
            if (state.typeAssemble.value) {
                const typeAssemble = data.types.data?.find(
                    (item) => `${item.id}` == state.typeAssemble.value,
                )?.typeAssemble;
                res += '/' + typeAssemble;
            }
            if (state.variantAssemble.value) {
                const variant = data.variants.data?.find(
                    (item) => `${item.id}` == state.variantAssemble.value,
                )?.variantAssemble;
                res += `/${variant}`;
            }
            if (state.color.value) {
                const color = data.colors.data?.find(
                    (item) => `${item.id}` == state.color.value,
                )?.colorAssemble;
                res += `/${color}`;
            }
            if (state.yarn.value) {
                const yarn = data.yarns.data?.find(
                    (item) => `${item.id}` == state.yarn.value,
                )?.yarnAssemble;
                res += `/${yarn}`;
            }
            if (state.grade.value) {
                const grade = data.grades.data?.find(
                    (item) => `${item.id}` == state.grade.value,
                )?.gradeAssemble;
                res += `/${grade}`;
            }
        }

        setModel(res);
    }, [state]);

    return { model, state, setStateHandler, getValue, getSelectProps, data };
};
