import { OPERATIONS, STATE } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { MakeBall } from './Pages/MakeBall';
import { Slicing } from './Pages/Slicing';
import { Sorting } from './Pages/Sorting';
import { OneToOne } from './Shared/OneToOne';

export const GetOrderSwitcher = ({
    operationId,
    record,
}: {
    operationId: number;
    record: iData;
}) => {
    switch (operationId) {
        case OPERATIONS.wash.id:
            return <OneToOne record={record} stateId={STATE.washed.id} />;
        case OPERATIONS.sorting.id:
            return <Sorting record={record} stateId={STATE.sorted.id} />;
        case OPERATIONS.sortingN.id:
            return <Sorting record={record} stateId={STATE.sortedN.id}/>;
        case OPERATIONS.sortingA.id:
            return <Sorting record={record} stateId={STATE.sortedA.id}/>;
        case OPERATIONS.glue.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.glued.id}
                    isCheckLosses={false}
                />
            );
        case OPERATIONS.improve.id:
            return <OneToOne record={record} stateId={STATE.improved.id} />;
        case OPERATIONS.autoclave.id:
            return <OneToOne record={record} stateId={STATE.autoclaved.id} />;
        case OPERATIONS.grindingEngraver.id:
            return <OneToOne record={record} stateId={STATE.grindedEngraver.id} />;
        case OPERATIONS.formation.id:
            return <OneToOne record={record} stateId={STATE.formated.id} />;
        case OPERATIONS.turning.id:
            return <OneToOne record={record} stateId={STATE.turned.id} />;
        case OPERATIONS.makeBall.id:
            return <MakeBall record={record} stateId={STATE.balled.id} />;
        case OPERATIONS.makeSuperBall.id:
            return <OneToOne record={record} stateId={STATE.makedSuperBall.id} />;
        case OPERATIONS.grindingSuper.id:
            return <OneToOne record={record} stateId={STATE.grindedSuper.id} />;
        case OPERATIONS.polishing.id:
            return <OneToOne record={record} stateId={STATE.polished.id} />;
        case OPERATIONS.slice.id:
            return <Slicing record={record} stateId={STATE.sliced.id} />;
    }
    return <></>;
};
