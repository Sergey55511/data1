import { OPERATIONS, STATE, WORKPIECETYPE } from '../../../../../../Shared/constants';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { Formation } from './Pages/Formation';
import { GrindingFormated } from './Pages/GrindingFormated';
import { MakeBall } from './Pages/MakeBall';
import { MakeMinalets } from './Pages/makeMinalets';
import { Patifon } from './Pages/Patifon';
import { Slicing } from './Pages/Slicing';
import { Sorting } from './Pages/Sorting';
import { SortingElements } from './Pages/SortingElements';
import { SortingInventory } from './Pages/SortingInventory';
import { SortingInventoryElements } from './Pages/SortingInventoryElements';
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
        case OPERATIONS.resortingElements.id:
            return <SortingInventoryElements record={record} />;
        case OPERATIONS.wash.id:
            return <OneToOne record={record} stateId={STATE.washed.id} isCheckLosses />;
        case OPERATIONS.wash2.id:
            return <OneToOne record={record} stateId={STATE.washed2.id} isCheckLosses />;
        case OPERATIONS.slicingBillets.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.slicedBillets.id}
                    defect
                    pruning
                    isShowWorkingTimeFact
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
                    isShowWorkingTimeFact
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
                    isShowWorkingTimeFact
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
                    isShowWorkingTimeFact
                    isCheckLosses
                />
            );
        case OPERATIONS.grindingMsc.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.grindedMsc.id}
                    defect
                    isShowWorkingTimeFact
                    isCheckLosses
                />
            );
        case OPERATIONS.roughTumbling.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.roughTumbled.id}
                    defect
                    isShowWorkingTimeFact
                    isCheckLosses
                />
            );
        case OPERATIONS.polishingMsc.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.polishedMsc.id}
                    defect
                    isShowWorkingTimeFact
                    isCheckLosses
                />
            );
        case OPERATIONS.thermoOven.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.thermedOven.id}
                    defect
                    isShowWorkingTimeFact
                    isCheckLosses
                />
            );
        case OPERATIONS.thermoLamp.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.thermedLamp.id}
                    defect
                    isShowWorkingTimeFact
                    isCheckLosses
                />
            );
        case OPERATIONS.sorting.id:
            return (
                <Sorting
                    record={record}
                    stateId={STATE.sorted.id}
                    isMaterialGroup
                    isFraction
                />
            );
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
        case OPERATIONS.glue2.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.glued2.id}
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
        case OPERATIONS.patifon.id:
            return <Patifon record={record} stateId={STATE.calibratedFormated.id} />;
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
            return (
                <GrindingFormated
                    record={record}
                    stateId={STATE.grindedSuper.id}
                    workpiecetypeId={WORKPIECETYPE.grindingFormated.id}
                />
            );
        case OPERATIONS.grindingCrumpledBall.id:
            return (
                <GrindingFormated
                    record={record}
                    stateId={STATE.grindedCrumpledBall.id}
                    workpiecetypeId={WORKPIECETYPE.crumpledBall.id}
                />
            );
        case OPERATIONS.pot.id:
            return (
                <GrindingFormated
                    record={record}
                    stateId={STATE.grindedMsc.id}
                    workpiecetypeId={WORKPIECETYPE.crumpledBall.id}
                />
            );
        case OPERATIONS.polishing.id:
            return <OneToOne record={record} stateId={STATE.polished.id} isCheckLosses />;
        case OPERATIONS.slice.id:
            return (
                <OneToOne
                    record={record}
                    stateId={STATE.sliced.id}
                    isCheckLosses
                    defect
                    garbage
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
