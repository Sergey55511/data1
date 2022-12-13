import { Drawer } from 'antd';
import { Wrapper } from './style';
import { Models } from './Models';
import { Search } from './Search';
import { observer } from 'mobx-react-lite';
import { iData } from '../../../../../../../Shared/Types/interfaces';

export const SetTask = observer(
    ({
        onClose,
        record,
        operationId,
    }: {
        onClose: () => void;
        record: iData;
        operationId?: number;
    }) => {
        return (
            <Drawer open title="Назначить задание" onClose={onClose}>
                <Wrapper>
                    <Search operationId={operationId} record={record} />
                    <Models />
                </Wrapper>
            </Drawer>
        );
    },
);
