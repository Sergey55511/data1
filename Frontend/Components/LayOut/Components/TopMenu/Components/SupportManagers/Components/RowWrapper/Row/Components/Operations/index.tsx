import { Drawer } from 'antd';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { iManager } from '../../../../../../../../../../../../Shared/Types/interfaces';
import { AddOperation } from './Components/AddOperation';
import { OperationsWrapper } from './Components/OperationsWrapper';

export const Operations = observer(
    ({
        onClose,
        worker,
        fetchManagers,
    }: {
        onClose: () => void;
        worker: iManager;
        fetchManagers: () => void;
    }) => {
        return (
            <Drawer open={true} onClose={onClose} title="Операции:">
                <Wrapper>
                    <div className="title">Работник: {worker.name}</div>
                    <AddOperation managerId={worker.id} />
                    <OperationsWrapper worker={worker} fetchManagers={fetchManagers} />
                </Wrapper>
            </Drawer>
        );
    },
);
