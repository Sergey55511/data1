import { Divider } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
import { Frame } from '../../../Shared/Frame';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { Title } from '../../../Shared/Title';
import { GetOrderSwitcher } from './Components';
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

    const order = orders[0];
    const Item = useCallback(
        ({
            keyObj,
            title = KEYSLEFTOVERS[keyObj]?.title,
        }: {
            keyObj: keyof typeof KEYSLEFTOVERS;
            title?: string;
        }) => {
            if (!order) return null;
            return (
                <div className="item">
                    <h4>{title}:</h4>
                    <div>{order[KEYSLEFTOVERS[keyObj].key as keyof iData]}</div>
                </div>
            );
        },
        [orders[0]],
    );
    return (
        <Wrapper>
            <Title text="Принять работу:" />
            <div className="content">
                <div className="order">
                    <Frame legend="В работе">
                        <div>
                            <Item keyObj="operation" />
                            <Item keyObj="user" />
                            <Item keyObj="manager" />
                            <Item keyObj="lot" />
                            <Item keyObj="productionId" />
                            <Item keyObj="fraction" />
                            <Item keyObj="workpieceType" />
                            <Item keyObj="materialGroup" />
                            <Item keyObj="grade" />
                            <Item keyObj="model" />
                            <Item keyObj="color" />
                            <Item keyObj="length" />
                            <Item keyObj="channel" />
                            <Item keyObj="state" />
                            <Item keyObj="width" title="В работе гр." />
                            <Item keyObj="count" title="В работе шт." />
                        </div>
                    </Frame>
                </div>
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
