import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as api from '../../../../../../Store/Lists/api';
import { getMaxLot } from '../../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../../Store/useStores';
import { iState } from './../useProps';

export const useData = ({
    index,
    stateRow,
    onChange,
}: {
    index: number;
    stateRow: iState;
    onChange: (index: number, v: string | number, fieldName: keyof iState) => void;
}) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const workpieceType = useQuery(
        ['workpieceType', index, storeId],
        () => api.getWorkpieceType({ storeId }),
        { enabled: !!storeId },
    );

    useEffect(() => {
        onChange(index, '', 'gradeId');
        onChange(index, '', 'stateId');
        onChange(index, '', 'sizeRangeId');
        onChange(index, '', 'typeId');
    }, [stateRow.workpieceTypeId.value]);

    useEffect(() => {
        onChange(index, '', 'lengthId');
    }, [stateRow.workpieceTypeId.value, stateRow.sizeRangeId.value]);

    const workpieceTypeId = stateRow.workpieceTypeId.value;
    const sizeRangeId = stateRow.sizeRangeId.value;

    const grade = useQuery(
        ['grade', index, storeId, workpieceTypeId],
        () => api.getGrades({ storeId }),
        {
            enabled: !!(storeId && workpieceTypeId),
        },
    );
    const color = useQuery(['color', index, storeId], () => api.getColors({ storeId }), {
        enabled: !!storeId,
    });
    const sizeRange = useQuery(
        ['sizeRange', index, storeId, workpieceTypeId],
        () => api.getSizeRange({ storeId, workpieceTypeId: +workpieceTypeId }),
        { enabled: !!(storeId && workpieceTypeId) },
    );
    const length = useQuery(
        ['length', index, storeId, workpieceTypeId, sizeRangeId],
        () =>
            api.getLength({
                storeId,
                workpieceTypeId: +workpieceTypeId,
                sizeRangeId: +sizeRangeId,
            }),
        {
            enabled: !!(storeId && workpieceTypeId && sizeRangeId),
        },
    );
    const channel = useQuery(['channel', index, storeId], () => api.getChannel(), {
        enabled: !!storeId,
    });
    const type = useQuery(
        ['type', index, storeId, workpieceTypeId],
        () => api.getTypes({ workpieceTypeId }),
        {
            enabled: !!(storeId && workpieceTypeId),
        },
    );
    const state = useQuery(
        ['state', index, storeId, workpieceTypeId],
        () => api.getStates({ workpieceTypeId }),
        {
            enabled: !!(storeId && workpieceTypeId),
        },
    );

    return {
        workpieceType,
        grade,
        color,
        sizeRange,
        length,
        channel,
        type,
        state,
    };
};
