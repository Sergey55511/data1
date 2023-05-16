import { useQuery } from '@tanstack/react-query';
import { getSizeRange } from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';

export const useData = (workpieceTypeId: number) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const sizeRange = useQuery(
        ['sizeRange', storeId, workpieceTypeId],
        () => getSizeRange({ storeId, workpieceTypeId }),
        { enabled: !!(storeId && workpieceTypeId) },
    );
    return { sizeRange };
};
