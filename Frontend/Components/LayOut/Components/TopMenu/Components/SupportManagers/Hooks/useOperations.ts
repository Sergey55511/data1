import { useQuery } from '@tanstack/react-query';
import { getOperations } from '../../../../../../../Store/Lists/api';

export const useOperations = (storeId: number) => {
    return useQuery(['allOperations'], () => getOperations(storeId), {
        enabled: !!storeId,
    });
};