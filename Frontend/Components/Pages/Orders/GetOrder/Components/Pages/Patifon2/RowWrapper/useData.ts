import { useQuery } from '@tanstack/react-query';
import { OPERATIONS } from '../../../../../../../../../Shared/constants';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { getSizeRange, getWorkpieceType } from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';
import { iState } from '../useProps';

export const useData = (record: iData, state: iState) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const workpieceTypeValue = state.workpieceType.value;
    const workpieceTypeId = workpieceTypeValue ? +workpieceTypeValue : undefined;

    const sizeRange = useQuery(
        ['sizeRange', storeId, workpieceTypeId],
        () => getSizeRange({ storeId, workpieceTypeId }),
        {
            enabled: !!(storeId && workpieceTypeId),
            select: (data) => {
                return data.filter((item) => item.size <= (record.size ?? 0));
            },
        },
    );
    const workpieceType = useQuery(
        ['workpieceType', storeId, workpieceTypeId, OPERATIONS.patifon2.id],
        () => getWorkpieceType({ storeId, operationId: OPERATIONS.patifon2.id }),
        {
            enabled: !!storeId,
        },
    );
    return { sizeRange, workpieceType };
};
