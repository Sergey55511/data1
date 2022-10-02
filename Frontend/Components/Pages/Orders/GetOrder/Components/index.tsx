import { iData } from '../../../../../../Shared/Types/interfaces';
import { Sorting } from './Pages/Sorting';
import { Wash } from './Pages/Wash';

export const GetOrderSwitcher = ({
    operationId,
    record,
}: {
    operationId: number;
    record: iData;
}) => {
    switch (operationId) {
        case 1:
            return <Wash record={record} />;
        case 2:
            return <Sorting />;
    }
    return <></>;
};
