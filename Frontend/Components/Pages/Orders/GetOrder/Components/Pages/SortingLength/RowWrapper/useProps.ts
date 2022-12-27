import { useStores } from '../../../../../../../../Store/useStores';
import { iState } from '../useProps';
import { useQuery } from '@tanstack/react-query';
import { getGrades, getLength } from '../../../../../../../../Store/Lists/api';
import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';

export interface iProps {
    isLoading?: boolean;
    index: number;
    removeRow: (i: number) => void;
    copyRow: (index: number) => void;
    state: iState;
    setState: Dispatch<SetStateAction<iState[]>>;
    record: iData;
}
export const useProps = ({ record, setState }: iProps) => {
    const { loginStore } = useStores();

    const workpieceTypeId = record.workpieceTypeId;

    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
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
    return { length, grade, onChange };
};
