import { OPERATIONS } from '../../../../../../Shared/constants';
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
        case OPERATIONS.wash.id:
            return <Wash record={record} />;
        case OPERATIONS.sorting.id:
            return <Sorting record={record}/>;
    }
    return <></>;
};
