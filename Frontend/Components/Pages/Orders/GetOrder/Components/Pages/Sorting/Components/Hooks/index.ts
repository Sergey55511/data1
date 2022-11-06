import { SetStateAction, useEffect } from 'react';
import { iState } from '../..';
import { OPERATIONS } from '../../../../../../../../../../Shared/constants';
import { useStores } from '../../../../../../../../../Store/useStores';

export const useLists = (
    storeId: number,
    index: number,
    state: iState,
    setState: (value: SetStateAction<iState[]>) => void,
) => {
    const { ListsStore } = useStores();

    useEffect(() => {
        setState((prev) => {
            prev[index].gradeId.value = '';
            return [...prev];
        });

        if (storeId && state.typeId.value)
            ListsStore.getGrades({
                storeId: storeId,
                operationId: OPERATIONS.sorting.id,
                typeId: +state.typeId.value,
            });
    }, [storeId, state.typeId.value]);

    useEffect(() => {
        setState((prev) => {
            prev[index].colorId.value = '';
            return [...prev];
        });

        if (storeId && state.typeId.value && state.gradeId.value)
            ListsStore.getColors({
                storeId: storeId,
                operationId: OPERATIONS.sorting.id,
                typeId: +state.typeId.value,
                gradeId: +state.gradeId.value,
            });
    }, [storeId, state.typeId.value, state.gradeId.value]);
};
