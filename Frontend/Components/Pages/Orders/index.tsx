import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from '../../../Store/useStores';
import { Title } from '../../Shared/Title';
import { Wrapper } from './style';
import { OrdersTable } from './Table';

export const Orders = observer(({ isGetOut }: { isGetOut?: boolean }) => {
    const { loginStore, OperationStore } = useStores();
    useEffect(() => {
        if (loginStore.user.storeId) {
            if (!isGetOut) OperationStore.getOrders(loginStore.user.storeId);
            if (isGetOut) OperationStore.getOrdersGetOut(loginStore.user.storeId);
        }
    }, [loginStore.user.storeId]);

    const title = isGetOut ? 'Выбытие:' : 'Задачи в работе:';
    return (
        <Wrapper>
            <div>
                <Title text={title} />
            </div>
            <OrdersTable isGetOut={isGetOut} />
        </Wrapper>
    );
});
