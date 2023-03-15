import { iData } from '../../../../../Shared/Types/interfaces';
import { Frame } from '../../../Shared/Frame';
import { iKeysLeftoversObject, KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { Item } from './Item';

export const Order = ({ order }: { order?: iData }) => {
    if (!order) return null;

    return (
        <div className="order">
            <Frame legend="В работе">
                <div className="frameBody">
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.operation} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.userLogin} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.manager} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.lot} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.productionId} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.fraction} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.workpieceType} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.materialGroup} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.grade} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.type} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.color} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.length} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.sizeRange} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.state} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.workingTimePlan} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.width} order={order} />
                    <ItemHoc keysLeftover={KEYSLEFTOVERS.count} order={order} />
                </div>
            </Frame>
        </div>
    );
};

const ItemHoc = ({
    keysLeftover,
    order,
}: {
    keysLeftover: iKeysLeftoversObject;
    order: iData;
}) => <Item title={keysLeftover.title} value={order[keysLeftover.key]} />;
