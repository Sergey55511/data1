import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getProductions } from '../../../../../Store/Lists/api';
import { useStores } from '../../../../../Store/useStores';

export const useProps = () => {
    const { loginStore } = useStores();
    const [production, setProduction] = useState<number>();
    const user = loginStore.user;
    const productionList = useQuery(
        ['productionList', user.storeId],
        () => getProductions(user.storeId),
        {
            enabled: !!user.storeId,
        },
    );

    const options = productionList.data?.map((item) => {
        const fullModal = item.fullModel ? ` (${item.fullModel})` : '';
        return {
            value: item.id,
            caption: `${item.description}${fullModal}`,
        };
    });

    const produstionData = useQuery(['produstionData', production], () => {}, {
        enabled: !!production,
    });
    return { production, setProduction, productionList, options };
};
