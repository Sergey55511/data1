import { Input, InputProps, InputRef } from 'antd';
import isInteger from 'lodash/isInteger';
import React from 'react';
import { ChangeEvent, useRef } from 'react';

export type tValue = number | string | undefined;

interface iInputNumberProps extends InputProps {
    onChangeHandler: (v: tValue) => void;
    isInt?: boolean;
}

export const InputNumber = React.forwardRef(
    (
        { onChangeHandler, isInt, ...props }: iInputNumberProps,
        ref?: React.ForwardedRef<InputRef>,
    ) => {
        const getValue = (v: string) => (isNaN(+v) ? '' : +v);

        const prepareValue = (v: tValue) => {
            if (!v) return undefined;

            v = `${v}`.replace(',', '.');
            if (isInt) {
                const value = `${v}`.replace('.', '');
                if (!isInteger(+value)) return undefined;
                return value;
            }

            const regexp = /^\d+[.|,]\d+$|^\d+[.|,]$|^\d+$/;
            if (regexp.test(v as string)) return v;

            return getValue(v as string);
        };

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            const value = prepareValue(e.target.value);
            onChangeHandler(value);
        };

        return <Input {...props} onChange={onChange} ref={ref} />;
    },
);
