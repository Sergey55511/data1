import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { iData, iDataTable } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
import { Frame } from '../../../Shared/Frame';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { Title } from '../../../Shared/Title';
import { GetOrderSwitcher } from './Components';
import { Item } from './Item';
import { Wrapper } from './style';

export const Order = ({ order }: { order?: iData }) => {
    if (!order) return null;

    return (
        <div className="order">
            <Frame legend="В работе">
                <div>
                    <Item
                        title={KEYSLEFTOVERS.operation.title}
                        value={order['operation']}
                    />
                    <Item
                        title={KEYSLEFTOVERS.userLogin.title}
                        value={order['userLogin']}
                    />
                    <Item
                        title={KEYSLEFTOVERS.manager.title}
                        value={order['managerLogin']}
                    />
                    <Item title={KEYSLEFTOVERS.lot.title} value={order['lot']} />
                    <Item
                        title={KEYSLEFTOVERS.productionId.title}
                        value={order['productionId']}
                    />
                    <Item
                        title={KEYSLEFTOVERS.fraction.title}
                        value={order['fraction']}
                    />
                    <Item
                        title={KEYSLEFTOVERS.workpieceType.title}
                        value={order['workpieceType']}
                    />
                    <Item
                        title={KEYSLEFTOVERS.materialGroup.title}
                        value={order['materialGroup']}
                    />
                    <Item title={KEYSLEFTOVERS.grade.title} value={order['grade']} />
                    <Item title={KEYSLEFTOVERS.type.title} value={order['type']} />
                    <Item title={KEYSLEFTOVERS.color.title} value={order['color']} />
                    <Item title={KEYSLEFTOVERS.length.title} value={order['length']} />
                    <Item
                        title={KEYSLEFTOVERS.sizeRange.title}
                        value={order['sizeRange']}
                    />
                    <Item title={KEYSLEFTOVERS.state.title} value={order['state']} />
                    <Item title={KEYSLEFTOVERS.width.title} value={order['width']} />
                    <Item title={KEYSLEFTOVERS.count.title} value={order['count']} />
                </div>
            </Frame>
        </div>
    );
};
