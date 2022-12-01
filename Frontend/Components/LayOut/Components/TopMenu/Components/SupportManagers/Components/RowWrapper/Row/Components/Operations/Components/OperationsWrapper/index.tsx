import { observer } from 'mobx-react-lite';
import { iManager } from '../../../../../../../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../../../../../../../Store/useStores';
import { useManagerOperations } from '../../Hooks';
import { Row } from './Row';
import { Wrapper } from './style';

export const OperationsWrapper = observer(
    ({ worker, fetchManagers }: { worker: iManager; fetchManagers: () => void }) => {
        const { loginStore } = useStores();
        const managerOperations = useManagerOperations(
            loginStore.user.storeId,
            worker.id,
            true,
        );

        return (
            <Wrapper>
                {managerOperations.isFetching ? (
                    <div>Загрузка ...</div>
                ) : (
                    managerOperations.data?.map((item) => (
                        <Row
                            managerId={worker.id}
                            key={item.id}
                            operation={item}
                            fetch={managerOperations.refetch}
                            fetchManagers={fetchManagers}
                        />
                    ))
                )}
            </Wrapper>
        );
    },
);
