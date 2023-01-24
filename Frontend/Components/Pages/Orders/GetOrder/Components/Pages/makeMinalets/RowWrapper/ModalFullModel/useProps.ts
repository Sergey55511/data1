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
        ['profile', storeId, state.workpieceType.value, state.sizeRangeModel.value],
        () => {
            const workpieceType = getIdValue(state.workpieceType.value);
            const sizeRangeModel = getIdValue(state.sizeRangeModel.value);

            return getProfile(workpieceType, sizeRangeModel);
        },
        {
            enabled: !!(
                storeId &&
                state.workpieceType.value &&
                state.sizeRangeModel.value
            ),
        },
    );

    useEffect(() => resetValue('profile'), [state.sizeRangeModel.value]);
    useEffect(() => resetValue('model'), [state.profile.value]);

    const model = useQuery(
        [
            'model',
            storeId,
            state.workpieceType.value,
            state.profile.value,
            state.sizeRangeModel.value,
        ],
        () => {
            const workpieceTypeId = getIdValue(state.workpieceType.value);
            const profileId = getIdValue(state.profile.value);
            const sizeRangeModelId = getIdValue(state.sizeRangeModel.value);
            return getModels(workpieceTypeId, profileId, sizeRangeModelId);
        },
        {
            enabled: !!(
                storeId &&
                state.workpieceType.value &&
                state.profile.value &&
                state.sizeRangeModel.value
            ),
        },
    );

    const sizeRangeModel = useQuery(
        ['sizeRangeModel', state.workpieceType.value, record.size],
        () => {
            const workpieceTypeId = getIdValue(state.workpieceType.value);

            // const profileId = getIdValue(state.profile.value);
            // const modelId = getIdValue(state.model.value);

            return getSizeRangeModel({
                workpieceTypeId,
                size: record.size,
            });
        },
        {
            enabled: !!(storeId && state.workpieceType.value),
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
