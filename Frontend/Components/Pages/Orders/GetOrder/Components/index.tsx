import { OPERATIONS, STATE } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { Formation } from './Pages/Formation';
import { MakeBall } from './Pages/MakeBall';
import { MakeMinalets } from './Pages/makeMinalets';
import { Slicing } from './Pages/Slicing';
import { Sorting } from './Pages/Sorting';
import { SortingElements } from './Pages/SortingElements';
import { SortingInventory } from './Pages/SortingInventory';
import { SortingLength } from './Pages/SortingLength';
import { SortingPrunings } from './Pages/SortingPrunings';
import { OneToOne } from './Shared/OneToOne';

export const GetOrderSwitcher = ({
    operationId,
    record,
}: {
    operationId: number;
    record: iData;
}) => {
    switch (operationId) {
        case OPERATIONS.resorting.id:
            return <SortingInventory record={record} />;
        case OPERATIONS.wash.id:
            return <OneToOne record={record} stateId={STATE.washed.id} isCheckLosses />;
        case OPERATIONS.slicingBillets.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.slicedBillets.id}
                    defect
                    pruning
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.drillingPill.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.drilledPill.id}
                    defect
                    isShowChannel
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.drilling.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.drilled.id}
                    defect
                    isShowChannel
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.waterDrilling.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.waterDrilled.id}
                    defect
                    isShowChannel
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.grindingMsc.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.grindedMsc.id}
                    defect
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.roughTumbling.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.roughTumbled.id}
                    defect
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.polishingMsc.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.polishedMsc.id}
                    defect
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.thermoOven.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.thermedOven.id}
                    defect
                    isShowWorkingHours
                    isCheckLosses
                />
            );
        case OPERATIONS.thermoLamp.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.thermedLamp.id}
                    defect
                    isShowWorkingHours
                    isCheckLosses
                />
            );

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
            return (
                <OneToOne record={record} stateId={STATE.autoclaved.id} isCheckLosses />
            );
        case OPERATIONS.grindingEngraver.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.grindedEngraver.id}
                    isCheckLosses
                />
            );
        case OPERATIONS.formation.id:
            return <Formation record={record} stateId={STATE.formated.id} />;
        case OPERATIONS.turning.id:
            return <OneToOne record={record} stateId={STATE.turned.id} isCheckLosses />;
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
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.makedSuperBall.id}
                    isCheckLosses
                />
            );
        case OPERATIONS.grindingSuper.id:
            return <Formation record={record} stateId={STATE.grindedSuper.id} />;
        case OPERATIONS.polishing.id:
            return <OneToOne record={record} stateId={STATE.polished.id} isCheckLosses />;
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
        case OPERATIONS.sortingPrunings.id:
            return <SortingPrunings record={record} stateId={STATE.sortedLength.id} />;
        case OPERATIONS.sortingElements.id:
            return <SortingElements record={record} stateId={STATE.sertedElements.id} />;
        case OPERATIONS.makingMinalets.id:
            return (
                <MakeMinalets record={record} stateId={STATE.minaretFinishedElement.id} />
            );
    }
    return <></>;
};
