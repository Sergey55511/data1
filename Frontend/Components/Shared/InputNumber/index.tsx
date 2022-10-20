import { Input, InputProps } from 'antd';
import { ChangeEvent } from 'react';

export type tValue = number | string | undefined;

interface iInputNumberProps extends InputProps {
    onChangeHandler: (v: tValue) => void;
}

export const InputNumber = ({ onChangeHandler, ...props }: iInputNumberProps) => {
    const getValue = (v: string) => (isNaN(+v) ? '' : +v);

    const prepareValue = (v: tValue) => {
        if (!v) return undefined;
        v = `${v}`.replace(',', '.');
        const regexp = /^\d+[.|,]\d+$|^\d+[.|,]$|^\d+$/;
        if (regexp.test(v as string)) return v;

        return getValue(v as string);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = prepareValue(e.target.value);
        onChangeHandler(value);
    };

    return <Input {...props} onChange={onChange} />;
};
