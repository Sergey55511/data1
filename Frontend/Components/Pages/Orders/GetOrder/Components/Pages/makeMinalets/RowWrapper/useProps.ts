import { useQuery } from '@tanstack/react-query';
import {
    getColors,
    getFullModels,
    getGrades,
    getModels,
    getProfile,
    getSizeRangeModel,
    getWorkpieceType,
} from '../../../../../../../../Store/Lists/api';
import { iState } from '../useProps';

export const useProps = (storeId: number, state: iState) => {
    const getIdValue = (value: any) => (value ? +value : undefined);

    const grade = useQuery(['grade'], () => getGrades({}));
    const color = useQuery(['color'], () => getColors({ storeId }), {
        enabled: !!storeId,
    });
    const workpieceType = useQuery(['workpieceType'], () => getWorkpieceType({}), {
        enabled: !!storeId,
    });
    const fullModel = useQuery(
        ['fullModel', state.workpieceType.value],
        () => getFullModels({}),
        {
            enabled: !!(storeId && state.workpieceType.value),
        },
    );

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
    const model = useQuery(['model'], () => getModels(), {
        enabled: !!(storeId && state.workpieceType.value),
    });
    const sizeRangeModel = useQuery(
        ['sizeRangeModel', state.workpieceType.value, state.profile.value],
        () => {
            const workpieceTypeId = getIdValue(state.workpieceType.value);

            const profileId = getIdValue(state.profile.value);

            return getSizeRangeModel({ workpieceTypeId, profileId });
        },
        {
            enabled: !!(storeId && state.workpieceType.value),
        },
    );

    return {
        data: { grade, color, workpieceType, fullModel, sizeRangeModel, profile, model },
    };
};
