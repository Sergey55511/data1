import { Drawer } from 'antd';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { iManager } from '../../../../../../../../../../../Shared/Types/interfaces';
import { AddOperation } from './Components/AddOperation';
import { OperationsWrapper } from './Components/OperationsWrapper';

export const Operations = observer(
    ({ onClose, worker }: { onClose: () => void; worker: iManager }) => {
        return (
            <Drawer open={true} onClose={onClose} title="Операции:">
                <Wrapper>
                    <div>Работник: {worker.name}</div>
                    <AddOperation managerId={worker.id} />
                    <OperationsWrapper worker={worker} />
                </Wrapper>
            </Drawer>
        );
    },
);
