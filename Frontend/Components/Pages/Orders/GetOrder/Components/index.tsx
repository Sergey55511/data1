import { OPERATIONS, STATE } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { MakeBall } from './Pages/MakeBall';
import { MakeMinalets } from './Pages/makeMinalets';
import { Slicing } from './Pages/Slicing';
import { Sorting } from './Pages/Sorting';
import { SortingElements } from './Pages/SortingElements';
import { SortingLength } from './Pages/SortingLength';
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
        case OPERATIONS.slicingBillets.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.slicedBillets.id}
                    defect
                    pruning
                />
            );
        case OPERATIONS.drillingPill.id:
            return <OneToOne record={record} stateId={STATE.drilledPill.id} defect isShowChannel/>;
        case OPERATIONS.drilling.id:
            return <OneToOne record={record} stateId={STATE.drilled.id} defect isShowChannel />;
        case OPERATIONS.waterDrilling.id:
            return <OneToOne record={record} stateId={STATE.waterDrilled.id} defect isShowChannel/>;
        case OPERATIONS.grindingMsc.id:
            return <OneToOne record={record} stateId={STATE.grindedMsc.id} defect />;
        case OPERATIONS.roughTumbling.id:
            return <OneToOne record={record} stateId={STATE.roughTumbled.id} defect />;
        case OPERATIONS.polishingMsc.id:
            return <OneToOne record={record} stateId={STATE.polishedMsc.id} defect />;
        case OPERATIONS.thermoOven.id:
            return <OneToOne record={record} stateId={STATE.thermedOven.id} defect />;
        case OPERATIONS.thermoLamp.id:
            return <OneToOne record={record} stateId={STATE.thermedLamp.id} defect />;

        case OPERATIONS.sorting.id:
            return <Sorting record={record} stateId={STATE.sorted.id} />;
        case OPERATIONS.sortingN.id:
            return <Sorting record={record} stateId={STATE.sortedN.id} />;
        case OPERATIONS.sortingA.id:
            return <Sorting record={record} stateId={STATE.sortedA.id} />;
        case OPERATIONS.glue.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.glued.id}
                    isCheckLosses={false}
                />
            );
        case OPERATIONS.glueBlank.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.gluedBlank.id}
                    isCheckLosses={false}
                />
            );
        case OPERATIONS.sortingB.id:
            return <Sorting record={record} stateId={STATE.sortedA.id} />;
        case OPERATIONS.improve.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.improved.id}
                    isCheckLosses={false}
                />
            );
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
        case OPERATIONS.sliceIk.id:
            return (
                <Slicing
                    record={record}
                    stateId={STATE.sliced.id}
                    operationId={OPERATIONS.sliceIk.id}
                    isShowState
                />
            );
        case OPERATIONS.makeSuperBall.id:
            return <OneToOne record={record} stateId={STATE.makedSuperBall.id} />;
        case OPERATIONS.grindingSuper.id:
            return <OneToOne record={record} stateId={STATE.grindedSuper.id} />;
        case OPERATIONS.polishing.id:
            return <OneToOne record={record} stateId={STATE.polished.id} />;
        case OPERATIONS.slice.id:
            return (
                <Slicing
                    record={record}
                    stateId={STATE.sliced.id}
                    operationId={OPERATIONS.slice.id}
                />
            );
        case OPERATIONS.sortingLength.id:
            return <SortingLength record={record} stateId={STATE.sortedLength.id} />;
        case OPERATIONS.sortingElements.id:
            return <SortingElements record={record} stateId={STATE.sertedElements.id} />;
        case OPERATIONS.makingMinalets.id:
            return <MakeMinalets record={record} stateId={STATE.sertedElements.id} />;
    }
    return <></>;
};
