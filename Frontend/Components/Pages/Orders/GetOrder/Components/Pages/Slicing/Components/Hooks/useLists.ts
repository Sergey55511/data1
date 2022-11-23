import { Dispatch, SetStateAction, useEffect } from 'react';
import { iState } from '../..';
import { iLength } from '../../../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../../../Store/useStores';
import { iLists } from '../Row';

export const useLists = (
    setLists: Dispatch<SetStateAction<iLists | undefined>>,
    storeId: number,
    state: iState,
    index: number,
    setIsLoadinglength: (flag: boolean) => void,
    onChange: (v: string | number, index: number, fieldName: keyof iState) => void,
) => {
    const { ListsStore } = useStores();

    useEffect(() => {
        if (!storeId) return;
        if (!state.workpieceTypeId.value) return;

        const fetchList = async () => {
            setIsLoadinglength(true);
            onChange('', index, 'sizeRangeId');
            const sizeRange = await ListsStore.getSizeRange({
                storeId: storeId,
                workpieceTypeId: +state.workpieceTypeId.value,
            });

            setLists((prev) => {
                if (prev) {
                    prev.sizeRange = sizeRange;
                    return prev;
                }
                return { sizeRange } as iLists;
            });

            setIsLoadinglength(false);
        };
        fetchList();
    }, [storeId, state.workpieceTypeId.value]);

    useEffect(() => {
        if (!storeId) return;
        if (!state.workpieceTypeId.value) return;
        if (!state.sizeRangeId.value) return;

        const fetchList = async () => {
            setIsLoadinglength(true);
            onChange('', index, 'colorId');
            onChange('', index, 'gradeId');

            const grade = await ListsStore.getGrades({
                storeId: storeId,
                workpieceTypeId: +state.workpieceTypeId.value,
                sizeRangeId: +state.sizeRangeId.value,
            });

            setLists((prev) => {
                if (prev) {
                    prev.grade = grade;
                    return prev;
                }
                return { grade } as iLists;
            });
            setIsLoadinglength(false);
        };
        fetchList();
    }, [storeId, state.workpieceTypeId.value, state.sizeRangeId.value]);
};
