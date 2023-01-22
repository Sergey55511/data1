import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import {
    getColors,
    getGradesWorpieceType,
    getWorkpieceTypeModel,
} from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';
import { iState } from '../useProps';

export interface iProps {
    isLoading?: boolean;
    index: number;
    removeRow: (i: number) => void;
    copyRow: (i: number) => void;
    state: iState;
    setState: Dispatch<SetStateAction<iState[]>>;
    record: iData;
}

export const useProps = (props: iProps) => {
    const { loginStore } = useStores();

    const storeId = loginStore.user.storeId;
    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        props.setState((prev) => {
            const elem = prev[index][fieldName];
            if (typeof elem != 'string' && elem) elem.value = v;
            return [...prev];
        });
    };

    const grade = useQuery(
        ['grade', props.state.workpieceType.value],
        () => getGradesWorpieceType(+props.state.workpieceType.value),
        { enabled: !!props.state.workpieceType.value },
    );
    const color = useQuery(['color', props.index], () => getColors({ storeId }), {
        enabled: !!storeId,
    });
    const workpieceType = useQuery(
        ['workpieceType', props.index],
        () => getWorkpieceTypeModel(props.record.operationId, true),
        {
            enabled: !!storeId,
        },
    );

    useEffect(() => {
        props.setState((prev) => {
            prev[props.index].profile.value = '';
            prev[props.index].model.value = '';
            prev[props.index].sizeRangeModel.value = '';
            prev[props.index].fullModelId.value = '';
            prev[props.index].fullModelName = '';
            return [...prev];
        });
    }, [props.state.workpieceType.value]);

    return {
        data: { grade, color, workpieceType },
        onChange,
    };
};
