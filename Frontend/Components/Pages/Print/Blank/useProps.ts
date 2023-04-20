import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useStores } from '../../../../Store/useStores';
import { getProductions } from '../../../../Store/Lists/api';
import { getPrintBlank } from '../api';
import { useRouter } from 'next/router';
import { ROUTES } from '../../constants';

export const useProps = () => {
    const { loginStore, ErrorStore } = useStores();
    const [production, setProduction] = useState<number>();
    const router = useRouter();
    const user = loginStore.user;
    useEffect(() => {
        loginStore.whoami();
    }, []);
    useEffect(() => {
        if (ErrorStore.error.status == 401) router.push(ROUTES.login);
    }, [ErrorStore.error.status]);

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
