import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from '../../../Store/useStores';
import { Title } from '../../Shared/Title';
import { Wrapper } from './style';
import { OrdersTable } from './Table';

export const Orders = observer(() => {
    const { loginStore, OperationStore } = useStores();
    useEffect(() => {
        if (loginStore.user.storeId) OperationStore.getOrders(loginStore.user.storeId);
    }, [loginStore.user.storeId]);
    return (
        <Wrapper>
            <div>
                <Title text="Задачи в работе:" />
            </div>
            <div>
                <OrdersTable />
            </div>
        </Wrapper>
    );
});
