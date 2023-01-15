import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { iData } from '../../../../../../../../../../Shared/Types/interfaces';
import {
    getFullModels,
    getModels,
    getProfile,
    getSizeRangeModel,
} from '../../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../../Store/useStores';
import { iState } from '../../useProps';

export const useProps = ({
    state,
    resetValue,
    record,
}: {
    state: iState;
    resetValue: (fieldName: keyof iState) => void;
    record: iData;
}) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;

    const getIdValue = (value: any) => (value ? +value : undefined);

    const profile = useQuery(
        ['profile', state.workpieceType.value],
        () => {
            const workpieceType = getIdValue(state.workpieceType.value);

            return getProfile(workpieceType);
        },
        {
            enabled: !!(storeId && state.workpieceType.value),
        },
    );

    useEffect(() => resetValue('model'), [state.profile.value]);

    const model = useQuery(
        ['model', state.workpieceType.value, state.profile.value],
        () => {
            const workpieceTypeId = getIdValue(state.workpieceType.value);
            const profileId = getIdValue(state.profile.value);
            return getModels(workpieceTypeId, profileId);
        },
        {
            enabled: !!(storeId && state.workpieceType.value && state.profile.value),
        },
    );

    useEffect(
        () => resetValue('sizeRangeModel'),
        [state.profile.value, state.model.value],
    );

    const sizeRangeModel = useQuery(
        [
            'sizeRangeModel',
            state.workpieceType.value,
            state.profile.value,
            state.model.value,
        ],
        () => {
            const workpieceTypeId = getIdValue(state.workpieceType.value);

            const profileId = getIdValue(state.profile.value);
            const modelId = getIdValue(state.model.value);

            return getSizeRangeModel({
                workpieceTypeId,
                profileId,
                modelId,
                size: record.size,
            });
        },
        {
            enabled: !!(
                storeId &&
                state.workpieceType.value &&
                state.profile.value &&
                state.model.value
            ),
        },
    );

    useEffect(
        () => resetValue('fullModelId'),
        [state.profile.value, state.model.value, state.sizeRangeModel.value],
    );

    const fullModel = useQuery(
        [
            'fullModel',
            state.workpieceType.value,
            state.profile.value,
            state.model.value,
            state.sizeRangeModel.value,
        ],
        () => {
            const workpieceTypeId = getIdValue(state.workpieceType.value);
            const profileId = getIdValue(state.profile.value);
            const modelId = getIdValue(state.model.value);
            const sizeRangeModelId = getIdValue(state.sizeRangeModel.value);

            return getFullModels({
                workpieceTypeId,
                profileId,
                modelId,
                sizeRangeModelId,
            });
        },
        {
            enabled: !!(
                storeId &&
                state.workpieceType.value &&
                state.profile.value &&
                state.model.value &&
                state.sizeRangeModel.value
            ),
        },
    );

    return {
        data: { fullModel, sizeRangeModel, profile, model },
    };
};
