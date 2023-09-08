import { useQuery } from '@tanstack/react-query';
import { getProductions } from '../../../../Store/Lists/api';
import { useStores } from '../../../../Store/useStores';

export const useGetProductionList = () => {
    const { loginStore } = useStores();
    const user = loginStore.user;
    return useQuery(
        ['productionList', user.storeId],
        () => getProductions(user.storeId),
        {
            enabled: !!user.storeId,
        },
    );
};
