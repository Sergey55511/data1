import { useQuery } from 'react-query';
import { iState } from '../..';
import {
    getColors,
    getGrades,
    getSizeRange,
    getStates,
    getWorkpieceType,
} from '../../../../../../../../../Store/Lists/api';

export const useData = (
    operationId: number,
    storeId: number,
    workpieceTypeId: number,
    sizeRangeId: number,
    onChange: (v: string | number, fieldName: keyof iState) => void,
    stateId?: number[],
) => {
    const stateResult = useQuery(
        ['state', stateId],
        () => {
            return getStates(stateId);
        },
        {
            enabled: !!stateId,
        },
    );

    const color = useQuery(
        ['colors', storeId],
        () => {
            onChange('', 'colorId');
            return getColors({ storeId });
        },
        {
            enabled: !!storeId,
        },
    );

    const grade = useQuery(
        ['grades', storeId, workpieceTypeId, sizeRangeId],
        () => {
            onChange('', 'gradeId');
            return getGrades({ storeId, workpieceTypeId, sizeRangeId });
        },
        {
            enabled: !!storeId,
        },
    );

    const sizeRange = useQuery(
        ['sizeRange', storeId, workpieceTypeId],
        () => {
            onChange('', 'sizeRangeId');
            return getSizeRange({
                storeId,
                workpieceTypeId,
            });
        },
        {
            enabled: !!storeId,
        },
    );

    const workpieceType = useQuery(
        ['workpieceType', storeId, operationId],
        () => {
            onChange('', 'workpieceTypeId');
            return getWorkpieceType({ storeId, operationId });
        },
        { enabled: !!storeId },
    );

    return { color, grade, sizeRange, workpieceType, stateResult };
};
