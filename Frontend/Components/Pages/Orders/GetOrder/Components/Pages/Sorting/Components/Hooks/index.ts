import { SetStateAction, useEffect } from 'react';
import { iState } from '../..';
import {
    OPERATIONS,
    WORKPIECETYPE,
} from '../../../../../../../../../../Shared/constants';
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

        if (storeId)
            ListsStore.getGrades({
                storeId: storeId,
                operationId: OPERATIONS.sorting.id,
                // typeId: +state.typeId.value,
            });
        ListsStore.getColors({
            storeId: storeId,
            operationId: OPERATIONS.sorting.id,
        });
        ListsStore.getSizeRange({
            storeId: storeId,
            operationId: OPERATIONS.sorting.id,
            workpieceTypeId: WORKPIECETYPE.stone.id,
        });
    }, [storeId]);
};
