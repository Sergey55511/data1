import { SetStateAction, useEffect } from 'react';
import {
    OPERATIONS,
    WORKPIECETYPE,
} from '../../../../../../../../../../Shared/constants';
import {
    iGrade,
    iSizeRange,
} from '../../../../../../../../../../Shared/Types/interfaces';
import { ListsStore } from '../../../../../../../../../Store/Lists';
import { useStores } from '../../../../../../../../../Store/useStores';
import { iState } from '../../useProps';

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

        ListsStore.getSizeRange({
            storeId: storeId,
            operationId: OPERATIONS.sorting.id,
            workpieceTypeId: WORKPIECETYPE.stone.id,
        });
    }, [storeId]);
};

export const getSizeRange = async (
    listsStore: ListsStore,
    setState: (value: SetStateAction<iState[]>) => void,
    setSizeRange: (value: SetStateAction<iSizeRange[]>) => void,
    index: number,
    storeId: number,
) => {
    setState((prev) => {
        prev[index].gradeId.value = '';
        return [...prev];
    });

    if (!WORKPIECETYPE.stone.id) return;

    const list = await listsStore.getSizeRange({
        storeId: storeId,
        operationId: OPERATIONS.sorting.id,
        workpieceTypeId: WORKPIECETYPE.stone.id,
    });
    setSizeRange(list);
};

export const getRootLists = async (
    listsStore: ListsStore,
    setGrade: (value: SetStateAction<iGrade[]>) => void,
    storeId?: number,
) => {
    if (storeId) listsStore.getTypes({});
    const grade = await listsStore.getGrades({
        storeId,
        operationId: OPERATIONS.sorting.id,
    });

    setGrade(grade);
    listsStore.getColors({
        storeId,
        operationId: OPERATIONS.sorting.id,
    });
};
