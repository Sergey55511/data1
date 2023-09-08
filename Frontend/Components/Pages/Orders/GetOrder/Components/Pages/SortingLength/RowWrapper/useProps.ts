import { useStores } from '../../../../../../../../Store/useStores';
import { iState } from '../useProps';
import { useQuery } from '@tanstack/react-query';
import { getColors, getGrades, getLength } from '../../../../../../../../Store/Lists/api';
import { Dispatch, SetStateAction } from 'react';
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
    arrowHandler: ReturnType<typeof useKeyArrow>;
}
export const useProps = ({ record, setState }: iProps) => {
    const { loginStore } = useStores();
    const workpieceTypeId = record.workpieceTypeId;

    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
            if (fieldName == 'duplicate') return prev;
            prev[index][fieldName].value = v;
            return [...prev];
        });
    };

    const storeId = loginStore.user.storeId;

    const length = useQuery(
        ['length', storeId, workpieceTypeId, record.sizeRangeId],
        () =>
            getLength({
                storeId: storeId,
                workpieceTypeId: workpieceTypeId,
                sizeRangeId: record.sizeRangeId,
            }),
        { enabled: !!(storeId && workpieceTypeId && record.sizeRangeId) },
    );

    const grade = useQuery(
        ['grade', storeId, workpieceTypeId],
        () =>
            getGrades({
                storeId: storeId,
                workpieceTypeId: workpieceTypeId,
            }),
        { enabled: !!(storeId && workpieceTypeId) },
    );
    const color = useQuery(['color', storeId], () => getColors({ storeId }), {
        enabled: !!storeId,
    });
    return { length, grade, onChange, color };
};
