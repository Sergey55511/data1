import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    iData,
    iFullModel,
    iProfile,
    iSizeRangeModel,
    iWorkpieceType,
} from '../../../../../../../../../Shared/Types/interfaces';
import {
    getFullModels,
    getProduction,
    getProfile,
    getSizeRange,
    getSizeRangeModel,
    getWorkpieceTypeModel,
} from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';
import { Task } from '../../useProps';

export interface iDataProps {
    workpieceType: UseQueryResult<iWorkpieceType[], unknown>;
    profile: UseQueryResult<iProfile[], unknown>;
    sizeRangeModel: UseQueryResult<iSizeRangeModel[], unknown>;
    fullModels: UseQueryResult<iFullModel[], unknown>;
}

export type tSetValue = <KEY extends keyof State>(
    key: KEY,
    value: State[KEY]['value'],
) => void;

class Field {
    key: string;
    value?: number;
    constructor(key: string) {
        this.key = key;
    }
}

export class State {
    workpieceTypeId = new Field('workpieceTypeId');
    modelId = new Field('modelId');
    profileId = new Field('profileId');
    lengthModelId = new Field('lengthModelId');
    sizeRangeModelId = new Field('sizeRangeModelId');
}

export interface iProps {
    onClose: () => void;
    record: iData;
    operationId?: number;
    setTask: (data: Task) => void;
    productionId?: number;
}
export const useProps = ({
    onClose,
    record,
    operationId,
    setTask,
    productionId,
}: iProps) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const [state, setState] = useState(new State());

    const submitButton = (data: Task) => {
        setTask(data);
        onClose();
    };

    const setValue: tSetValue = (key, value) => {
        setState((prev) => {
            const res = { ...prev };
            res[key].value = value;
            return res;
        });
    };

    const production = useQuery(
        ['productionId', productionId],
        () => getProduction(productionId),
        {
            enabled: !!productionId,
        },
    );

    const workpieceType = useQuery(
        ['workpieceType', 'model', operationId],
        () => getWorkpieceTypeModel(operationId),
        {
            enabled: !!(storeId && operationId),
        },
    );

    const profile = useQuery(
        ['profile', 'model', state.sizeRangeModelId.value],
        () => getProfile(state.workpieceTypeId.value, state.sizeRangeModelId.value),
        {
            enabled: !!(
                storeId &&
                state.workpieceTypeId.value &&
                state.sizeRangeModelId.value
            ),
        },
    );
    const sizeRecord = useQuery(
        ['sizeRecord', record?.sizeRangeId],
        () => getSizeRange({}, record?.sizeRangeId),
        {
            enabled: !!(storeId && record?.sizeRangeId),
        },
    );

    const size = sizeRecord.data ? sizeRecord.data[0]?.size : 0;

    const sizeRangeModel = useQuery(
        ['sizeRangeModel', 'model', state.workpieceTypeId.value, size],
        () =>
            getSizeRangeModel({
                workpieceTypeId: state.workpieceTypeId.value,
                size,
            }),
        {
            enabled: !!(storeId && state.workpieceTypeId.value && size),
        },
    );

    const fullModels = useQuery(
        [
            'fullModels',
            'model',
            storeId,
            state.workpieceTypeId.value,
            state.profileId.value,
            state.sizeRangeModelId.value,
        ],
        () =>
            getFullModels({
                workpieceTypeId: state.workpieceTypeId.value,
                profileId: state.profileId.value,
                sizeRangeModelId: state.sizeRangeModelId.value,
                size: record.size,
            }),
        {
            enabled: !!storeId,
        },
    );

    useEffect(() => {
        if (workpieceType.data?.length == 1) {
            setValue('workpieceTypeId', workpieceType.data[0].id);
        }
    }, [workpieceType.data]);

    useEffect(() => {
        setValue('workpieceTypeId', undefined);
    }, [operationId]);

    useEffect(() => {
        setValue('profileId', undefined);
    }, [state.workpieceTypeId.value]);

    return {
        data: { workpieceType, profile, sizeRangeModel, fullModels },
        state,
        setValue,
        submitButton,
    };
};
