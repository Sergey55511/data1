import { OPERATIONS, STATE } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { Glue } from './Pages/Glue';
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
            return <Wash record={record} stateId={STATE.washed.id} />;
        case OPERATIONS.sorting.id:
            return <Sorting record={record} />;
        case OPERATIONS.glue.id:
            return (
                <Glue record={record} stateId={STATE.glued.id} isCheckLosses={false} />
            );
        case OPERATIONS.improve.id:
            return <Glue record={record} stateId={STATE.improved.id} />;
        case OPERATIONS.autoclave.id:
            return <Glue record={record} stateId={STATE.autoclaved.id} />;
    }
    return <></>;
};
