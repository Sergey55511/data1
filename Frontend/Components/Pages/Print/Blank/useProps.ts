import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useStores } from '../../../../Store/useStores';
import { getProductions } from '../../../../Store/Lists/api';
import { getPrintBlank } from '../api';

export const useProps = () => {
    const { loginStore } = useStores();
    const [production, setProduction] = useState<number>();
    const user = loginStore.user;
    useEffect(() => {
        loginStore.whoami();
    }, []);

    const productionList = useQuery(
        ['productionList', user.storeId],
        () => getProductions(user.storeId),
        {
            enabled: !!user.storeId,
        },
    );

    const produstionData = useQuery(
        ['produstionData', production],
        () => {
            return getPrintBlank({ productionId: production });
        },
        {
            enabled: !!production,
        },
    );

    const isShowReport = !!produstionData.data?.length;
    return { production, setProduction, productionList, isShowReport, produstionData };
};
