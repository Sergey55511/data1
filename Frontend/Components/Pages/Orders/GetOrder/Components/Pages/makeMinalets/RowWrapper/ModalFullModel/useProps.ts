import { useQuery } from '@tanstack/react-query';
import {
    getFullModels,
    getModels,
    getProfile,
    getSizeRangeModel,
} from '../../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../../Store/useStores';
import { iState } from '../../useProps';

export const useProps = ({ state }: { state: iState }) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;

    const getIdValue = (value: any) => (value ? +value : undefined);

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
        data: { fullModel, sizeRangeModel, profile, model },
    };
};
