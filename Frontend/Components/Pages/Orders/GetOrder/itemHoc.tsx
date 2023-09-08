import { iData } from '../../../../../Shared/Types/interfaces';
import { iKeysLeftoversObject } from '../../../Shared/Table/constants';
import { Item } from './Item';

export const ItemHoc = ({
    keysLeftover,
    order,
}: {
    keysLeftover: iKeysLeftoversObject;
    order: iData;
}) => <Item title={keysLeftover.title} value={order[keysLeftover.key]} />;
