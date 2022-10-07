import { useEffect, useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableLeftOvers } from './Table';
import { MenuLeftovers } from './MenuLeftovers';
import { useStores } from '../../../Store/useStores';
import { observer } from 'mobx-react-lite';

export default observer(() => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const { loginStore, ListsStore } = useStores();

    useEffect(() => {
        if (loginStore.user.storeId) ListsStore.getLeftovers(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

    return (
        <>
            <MenuLeftovers setFilters={setFilters} />
            <TableLeftOvers {...{ filters, setFilters }} />
        </>
    );
});
