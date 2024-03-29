import { useStores } from '../../../../../../../../Store/useStores';
import { iState } from '../useProps';
import { useQuery } from '@tanstack/react-query';
import {
    getColors,
    getGrades,
    getLength,
    getSizeRange,
} from '../../../../../../../../Store/Lists/api';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { useKeyArrow } from '../../../Shared/Hooks/useKeyArrow';

export interface iProps {
    isLoading?: boolean;
    index: number;
    removeRow: (i: number) => void;
    copyRow: (index: number) => void;
    state: iState;
    setState: Dispatch<SetStateAction<iState[]>>;
    record: iData;
}
export const useProps = ({ setState, state, index, record }: iProps) => {
    const isFirstRender = useRef(true);
    const { loginStore } = useStores();
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();

    const getValue = (v: any) => (v ? +v : undefined);

    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
            prev[index][fieldName].value = v;
            return [...prev];
        });
    };

    const storeId = loginStore.user.storeId;

    const sizeRange = useQuery(
        ['sizeRange', storeId],
        () =>
            getSizeRange({
                storeId: storeId,
            }),
        { enabled: !!storeId },
    );
    const length = useQuery(
        ['length', storeId, state.sizeRange.value, record.workpieceTypeId],
        () =>
            getLength({
                storeId: storeId,
                sizeRangeId: getValue(state.sizeRange.value),
                workpieceTypeId: record.workpieceTypeId,
            }),
        { enabled: !!(storeId && state.sizeRange.value && record.workpieceTypeId) },
    );

    const grade = useQuery(['grade', storeId], () => getGrades({}), {
        enabled: !!storeId,
    });
    const color = useQuery(['color', storeId], () => getColors({}), {
        enabled: !!storeId,
    });

    useEffect(() => {
        if (!isFirstRender.current) onChange('', index, 'length');
        isFirstRender.current = false;
    }, [state.sizeRange.value]);

    return { length, grade, color, onChange, sizeRange, onKeyDown, onFocus, refHandler };
};
