import { useStores } from '../../../../../../../../Store/useStores';
import { iState } from '../useProps';
import { useQuery } from '@tanstack/react-query';
import {
    getColors,
    getFullModels,
    getGrades,
    getLength,
    getModels,
    getSizeRange,
} from '../../../../../../../../Store/Lists/api';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { iData, iFullModel } from '../../../../../../../../../Shared/Types/interfaces';
import { useKeyArrow } from '../../../Shared/Hooks/useKeyArrow';

export interface iProps {
    isLoading?: boolean;
    index: number;
    removeRow: (i: number) => void;
    copyRow: (index: number) => void;
    state: iState;
    setState: Dispatch<SetStateAction<iState[]>>;
    record: iData;
}
export const useProps = ({ setState, state, index, record }: iProps) => {
    const isFirstRender = useRef(true);
    const { loginStore } = useStores();
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();

    const getValue = (v: any) => (v ? +v : undefined);

    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
            prev[index][fieldName].value = v;
            return [...prev];
        });
    };

    const storeId = loginStore.user.storeId;

    const fullModel = useQuery(
        ['fullModel', record.fullModelId],
        () =>
            getFullModels({
                id: record.fullModelId,
            }),
        { enabled: !!record.fullModelId },
    );

    const profileId = fullModel.data ? fullModel.data[0]?.Profile.id : undefined;
    const sizeRangeModelId = fullModel.data
        ? fullModel.data[0]?.SizeRangeModel.id
        : undefined;

    const model = useQuery(
        ['model', profileId, sizeRangeModelId],
        () => getModels(record.workpieceTypeId, profileId, sizeRangeModelId),
        { enabled: !!storeId },
    );

    const grade = useQuery(
        ['grade', record.workpieceTypeId],
        () => getGrades({ workpieceTypeId: record.workpieceTypeId }),
        {
            enabled: !!record.workpieceTypeId,
        },
    );
    const color = useQuery(['color', storeId], () => getColors({}), {
        enabled: !!storeId,
    });

    return { length, grade, color, onChange, model, onKeyDown, onFocus, refHandler };
};
