import { useEffect, useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableLeftOvers } from './Table';
import { useStores } from '../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { MenuLeftovers } from '../../Shared/MenuLeftovers';

export default observer(() => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const { loginStore, OperationStore } = useStores();

    useEffect(() => {
        if (loginStore.user.storeId) OperationStore.getLeftovers(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

    return (
        <>
            <MenuLeftovers setFilters={setFilters} />
            <TableLeftOvers {...{ filters, setFilters }} />
        </>
    );
});
