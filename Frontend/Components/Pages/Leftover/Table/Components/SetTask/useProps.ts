import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { iData } from '../../../../../../../Shared/Types/interfaces';
import {
    getFullModels,
    getProfile,
    getSizeRange,
    getSizeRangeModel,
    getWorkpieceTypeModel,
} from '../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../Store/useStores';

class Field {
    key: string;
    value?: number;
    constructor(key: string) {
        this.key = key;
    }
}

const initState = {
    workpieceTypeId: new Field('workpieceTypeId'),
    modelId: new Field('modelId'),
    profileId: new Field('profileId'),
    lengthModelId: new Field('lengthModelId'),
    sizeRangeModelId: new Field('sizeRangeModelId'),
};

export const useProps = (operationId?: number, record?: iData) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const [state, setState] = useState(initState);

    const setValue = <KEY extends keyof typeof initState>(
        key: KEY,
        value: typeof initState[KEY]['value'],
    ) => {
        setState((prev) => {
            const res = { ...prev };
            res[key].value = value;
            return res;
        });
    };

    const workpieceType = useQuery(
        ['workpieceType', 'model', operationId],
        () => getWorkpieceTypeModel(operationId),
        {
            enabled: !!(storeId && operationId),
        },
    );

    const profile = useQuery(
        ['profile', 'model'],
        () => getProfile(state.workpieceTypeId.value),
        {
            enabled: !!(storeId && state.workpieceTypeId.value),
        },
    );
    const sizeRecord = useQuery(
        ['sizeRecord', record?.sizeRangeId],
        () => getSizeRange({}, record?.sizeRangeId),
        {
            enabled: !!(storeId && record?.sizeRangeId),
        },
    );

    console.log('record?.sizeRangeId', record?.sizeRangeId);

    const size = sizeRecord.data ? sizeRecord.data[0]?.size : 0;

    const sizeRangeModel = useQuery(
        ['sizeRangeModel', 'model', state.workpieceTypeId.value],
        () =>
            getSizeRangeModel({
                workpieceTypeId: state.workpieceTypeId.value,
                profileId: state.profileId.value,
                size,
            }),
        {
            enabled: !!(
                storeId &&
                state.workpieceTypeId.value &&
                state.profileId.value &&
                size
            ),
        },
    );

    const fullModels = useQuery(['fullModels', 'model'], getFullModels, {
        enabled: !!storeId,
    });

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
    useEffect(() => {
        setValue('sizeRangeModelId', undefined);
    }, [state.profileId.value]);

    return {
        data: { workpieceType, profile, sizeRangeModel },
        state,
        setValue,
    };
};
