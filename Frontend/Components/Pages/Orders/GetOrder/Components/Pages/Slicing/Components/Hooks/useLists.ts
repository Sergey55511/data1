import { useEffect } from 'react';
import { iState } from '../..';
import { useStores } from '../../../../../../../../../Store/useStores';

export const useLists = (
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

        const fetchLength = async () => {
            setIsLoadinglength(true);
            onChange('', index, 'sizeRangeId');
            await ListsStore.getSizeRange({
                storeId: storeId,
                workpieceTypeId: +state.workpieceTypeId.value,
            });

            setIsLoadinglength(false);
        };
        fetchLength();
    }, [storeId, state.workpieceTypeId.value]);

    useEffect(() => {
        if (!storeId) return;
        if (!state.workpieceTypeId.value) return;
        if (!state.sizeRangeId.value) return;

        const fetchLength = async () => {
            setIsLoadinglength(true);
            onChange('', index, 'length');
            await ListsStore.getLength({
                storeId: storeId,
                workpieceTypeId: +state.workpieceTypeId.value,
                sizeRangeId: state.sizeRangeId.value as number,
            });

            setIsLoadinglength(false);
        };
        fetchLength();
    }, [storeId, state.workpieceTypeId.value, state.sizeRangeId.value]);

    useEffect(() => {
        if (!storeId) return;
        if (!state.workpieceTypeId.value) return;
        if (!state.sizeRangeId.value) return;
        if (!state.length.value) return;

        const fetchLength = async () => {
            setIsLoadinglength(true);
            onChange('', index, 'colorId');
            await ListsStore.getColors({
                storeId: storeId,
                workpieceTypeId: +state.workpieceTypeId.value,
                sizeRangeId: +state.sizeRangeId.value,
                lengthId: +state.length.value,
            });

            setIsLoadinglength(false);
        };
        fetchLength();
    }, [
        storeId,
        state.workpieceTypeId.value,
        state.sizeRangeId.value,
        state.length.value,
    ]);

    useEffect(() => {
        if (!storeId) return;
        if (!state.workpieceTypeId.value) return;
        if (!state.sizeRangeId.value) return;
        if (!state.length.value) return;

        const fetchLength = async () => {
            setIsLoadinglength(true);
            onChange('', index, 'gradeId');
            await ListsStore.getGrades({
                storeId: storeId,
                workpieceTypeId: +state.workpieceTypeId.value,
                sizeRangeId: +state.sizeRangeId.value,
                lengthId: +state.length.value,
            });

            setIsLoadinglength(false);
        };
        fetchLength();
    }, [
        storeId,
        state.workpieceTypeId.value,
        state.sizeRangeId.value,
        state.length.value
    ]);
};
