import { State } from './State';

export const getSelectPropsCreator =
    ({
        state,
        getValue,
        setStateHandler,
    }: {
        state: State;
        getValue: (value?: string) => number | undefined;
        setStateHandler: (key: keyof State, value: any) => void;
    }) =>
    (field: keyof State) => {
        let value: any = '';
        let placeholder = '';
        if (state) {
            value = getValue(state[field].value);
            placeholder = state[field].placeholder;
        }

        return {
            placeholder: placeholder,
            onChange: (v: any) => setStateHandler(field, v),
            value,
        };
    };
