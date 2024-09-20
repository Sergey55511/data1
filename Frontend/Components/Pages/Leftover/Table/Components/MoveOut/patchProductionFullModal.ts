import { ListsStore } from '../../../../../../Store/Lists';
import { OperationStore } from '../../../../../../Store/OperationStore';

export const patchProductionFullModal = ({
    taskId,
    productionId,
    operationStore,
    listsStore,
}: {
    productionId?: number;
    taskId?: number;
    operationStore: OperationStore;
    listsStore: ListsStore;
}) => {
    const production = listsStore.productions.find((item) => item.id == productionId);
    if (production) {
        return operationStore.patchProductions({ ...production, fullModelId: taskId });
    }
};
