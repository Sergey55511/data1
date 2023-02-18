import { useRef } from 'react';
import { InputRef } from 'antd';

export const useKeyArrow = () => {
    const inputRefs = useRef<Array<InputRef | null>>([]);
    const activeInput = useRef<number>();

    const onKeyDown = (key: React.KeyboardEvent<HTMLInputElement>) => {
        const nextIndex = (activeInput.current || 0) + 1;
        const prevIndex = (activeInput.current || 1) - 1;
        if (key.code == 'ArrowDown') {
            const elem = inputRefs.current[nextIndex];
            elem?.focus();
            setTimeout(() => elem?.select());
        }
        if (key.code == 'ArrowUp') {
            const elem = inputRefs.current[prevIndex];
            elem?.focus();
            setTimeout(() => elem?.select());
        }
    };
    const onFocus = (index: number) => {
        activeInput.current = index;
    };
    const refHandler = (ref: InputRef | null, index: number) => {
        if (!inputRefs.current[index]) {
            if (ref) inputRefs.current.push(ref);
        }
    };

    return { onKeyDown, onFocus, refHandler };
};
