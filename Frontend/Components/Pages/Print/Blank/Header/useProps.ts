import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getProductions } from '../../../../../Store/Lists/api';
import { useStores } from '../../../../../Store/useStores';
import { getPrintBlank } from '../../api';

export const useProps = () => {
    const { loginStore } = useStores();
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

    return { productionList, options };
};
