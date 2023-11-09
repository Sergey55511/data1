import { useQuery } from '@tanstack/react-query';
import { OPERATIONS } from '../../../../../../../../../Shared/constants';
import { getSizeRange, getWorkpieceType } from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';
import { iState } from '../useProps';

export const useData = (state: iState) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const workpieceTypeId = +state.workpieceType.value;
    const sizeRangeId = +state.sizeRange.value;
    // const workpieceTypeId = WORKPIECETYPE.formated.id;
    const sizeRange = useQuery(
        ['sizeRange', storeId, workpieceTypeId],
        () => getSizeRange({ storeId, workpieceTypeId }),
        { enabled: !!(storeId && workpieceTypeId) },
    );
    const workpieceType = useQuery(
        ['workpieceType', storeId],
        () =>
            getWorkpieceType({
                storeId,
                operationId: OPERATIONS.formation.id,
            }),
        { enabled: !!storeId },
    );
    return { sizeRange, workpieceType };
};
