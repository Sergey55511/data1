import { useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useRef } from 'react';
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
    const isFirstRender = useRef({ gradeId: true, sizeRangeId: true });
    const stateResult = useQuery(
        ['state', stateId],
        () => {
            return getStates(stateId);
        },
        {
            enabled: !!stateId,
            staleTime: Infinity,
        },
    );

    const color = useQuery(
        ['colors', storeId],
        () => {
            return getColors({ storeId });
        },
        {
            enabled: !!storeId,
            staleTime: Infinity,
        },
    );

    let dependencies = ['grades', storeId, workpieceTypeId, sizeRangeId];

    useEffect(() => {
        if (!isFirstRender.current.gradeId) {
            onChange('', 'gradeId');
        }
        isFirstRender.current.gradeId = false;
    }, dependencies);

    const grade = useQuery(
        dependencies,
        () => {
            return getGrades({ storeId, workpieceTypeId, sizeRangeId });
        },
        {
            enabled: !!storeId,
            staleTime: Infinity,
        },
    );

    dependencies = ['sizeRange', storeId, workpieceTypeId, operationId];
    useEffect(() => {
        if (!isFirstRender.current.sizeRangeId) {
            onChange('', 'sizeRangeId');
        }
        isFirstRender.current.sizeRangeId = false;
    }, dependencies);

    const sizeRange = useQuery(
        dependencies,
        () => {
            return getSizeRange({
                storeId,
                workpieceTypeId,
                operationId,
            });
        },
        {
            enabled: !!storeId,
            staleTime: Infinity,
        },
    );

    const workpieceType = useQuery(
        ['workpieceType', storeId, operationId],
        () => {
            return getWorkpieceType({ storeId, operationId });
        },
        { enabled: !!storeId, staleTime: Infinity },
    );

    return { color, grade, sizeRange, workpieceType, stateResult };
};
