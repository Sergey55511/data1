import { useQuery } from '@tanstack/react-query';
import { WORKPIECETYPE } from '../../../../../../../../../Shared/constants';
import { getSizeRange } from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';

export const useData = () => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const workpieceTypeId = WORKPIECETYPE.crumpledBall.id;
    const sizeRange = useQuery(
        ['sizeRange', storeId, workpieceTypeId],
        () => getSizeRange({ storeId, workpieceTypeId }),
        { enabled: !!(storeId && workpieceTypeId) },
    );
    return { sizeRange };
};
