import { Input } from 'antd';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { iWidthOut, tFieldName } from '../../inerfaces';

export const InputWidth = ({
    widthOutAll,
    widthOut,
    fieldName,
    index,
    setWidthOut,
}: {
    widthOutAll?: iWidthOut[];
    widthOut?: iWidthOut;
    fieldName: tFieldName;
    index: number;
    setWidthOut: Dispatch<SetStateAction<iWidthOut[]>>;
}) => {
    const setValue = (e: ChangeEvent<HTMLInputElement>) => {
        const isEmpty = e.target.value == '';

        const value = +e.target.value;

        setWidthOut((prev) => {
            if (isEmpty) {
                prev = prev.filter((_, i) => i != index);
            } else {
                prev[index] = {
                    fieldName,
                    index,
                    value,
                };
            }

            return [...prev];
        });
    };
    const isDisabled = (() => {
        if (widthOutAll?.length) {
            if (widthOut) return false;
            return true;
        }
        return false;
    })();
    return (
        <Input
            // type="number"
            step={0.01}
            min={0}
            value={widthOut?.value}
            onChange={setValue}
            disabled={isDisabled}
            allowClear
        />
    );
};
