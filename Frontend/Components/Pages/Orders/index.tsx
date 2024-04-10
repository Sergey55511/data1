import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStores } from '../../../Store/useStores';
import { MenuLeftovers } from '../../Shared/MenuLeftovers';
import { OrdersTable } from './Table';
import { FilterValue } from 'antd/es/table/interface';
import { Content } from './Content';

export const Orders = observer(({ isGetOut }: { isGetOut?: boolean }) => {
    const { loginStore, OperationStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    useEffect(() => {
        if (loginStore.user.storeId) {
            if (!isGetOut) OperationStore.getOrders(loginStore.user.storeId);
            if (isGetOut) OperationStore.getOrdersGetOut(loginStore.user.storeId);
        }
    }, [loginStore.user.storeId]);

    const title = isGetOut ? 'Выбытие:' : 'Задачи в работе:';
    return (
        <>
            <MenuLeftovers text={title} setFilters={setFilters} content={<Content />} />
            <OrdersTable {...{ isGetOut, filters, setFilters }} />
        </>
    );
});
