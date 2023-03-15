import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
import { Frame } from '../../../Shared/Frame';
import { Title } from '../../../Shared/Title';
import { GetOrderSwitcher } from './Components';
import { Order } from './order';
import { Wrapper } from './style';

export const GetOrder = () => {
    const { OperationStore } = useStores();
    const [orders, setOrders] = useState<iData[]>([]);
    const router = useRouter();
    const pp = router.query.pp;

    useEffect(() => {
        if (pp)
            (async () => {
                const data = await OperationStore.getOrder(+pp);
                setOrders(data);
            })();
    }, [pp]);

    const order: iData = orders[0];

    return (
        <Wrapper>
            <Title text="Принять работу:" />
            <div className="content">
                <Order order={order} />
                <div className="result">
                    <Frame legend="Результат">
                        <GetOrderSwitcher
                            operationId={order?.operationId || 0}
                            record={orders[0]}
                        />
                    </Frame>
                </div>
            </div>
        </Wrapper>
    );
};
