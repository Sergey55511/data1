import { Drawer } from 'antd';
import { Row } from './Components/Row';
import { Wrapper } from './style';
import { useStores } from '../../../../../../../../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { useManagerOperations } from './Hooks';
import { iManager } from '../../../../../../../../../../../Shared/Types/interfaces';
import { AddOperation } from './Components/AddOperation';
import { OperationsWrapper } from './Components/OperationsWrapper';

export const Operations = observer(
    ({ onClose, worker }: { onClose: () => void; worker: iManager }) => {
        const { loginStore } = useStores();
        const managerOperations = useManagerOperations(
            loginStore.user.storeId,
            worker.id,
        );

        return (
            <Drawer open={true} onClose={onClose} title="Операции:">
                <Wrapper>
                    <div>Работник: {worker.name}</div>
                    <AddOperation />
                    <OperationsWrapper worker={worker} />
                </Wrapper>
            </Drawer>
        );
    },
);
