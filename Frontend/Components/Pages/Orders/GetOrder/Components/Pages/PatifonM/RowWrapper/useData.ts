import { useQuery } from '@tanstack/react-query';
import { WORKPIECETYPE } from '../../../../../../../../../Shared/constants';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { getSizeRangeModel } from '../../../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../../../Store/useStores';

export const useData = (record: iData) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;

    const workpieceTypeId = WORKPIECETYPE.ball.id;

    const sizeRange = useQuery(
        ['sizeRangeModel', workpieceTypeId, record.size],
        () => {
            return getSizeRangeModel({
                workpieceTypeId,
                size: record.size,
            });
        },
        {
            enabled: !!storeId,
        },
    );

    return { sizeRange };
};
