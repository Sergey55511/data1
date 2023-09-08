import { useQuery } from '@tanstack/react-query';
import { WORKPIECETYPE } from '../../../../../../../../../Shared/constants';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { getSizeRange } from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';

export const useData = (record: iData) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const workpieceTypeId = WORKPIECETYPE.crumpledBall.id;
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
    return { sizeRange };
};
