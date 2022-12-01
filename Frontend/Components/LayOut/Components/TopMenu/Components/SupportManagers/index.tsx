import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStores } from '../../../../../../Store/useStores';
import { AddWorker } from './Components/AddWorker';
import { RowWrapper } from './Components/RowWrapper';
import { Search } from './Components/Search';
import { useData } from './Hooks/useData';
import { Wrapper } from './style';

export const SupportManagers = observer(({ onClose }: { onClose?: () => void }) => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const [search, setSearch] = useState('');
    const [operationId, setOperationId] = useState(0);
    const [active, setActive] = useState<boolean | undefined>(undefined);

    const managers = useData({
        storeId: loginStore.user.storeId,
        operationId: operationId ? operationId : undefined,
        search,
        active,
    });

    return (
        <Drawer width={600} open title="Работники:" onClose={onClose}>
            <Wrapper>
                <AddWorker fetch={managers.refetch} />
                <Search
                    {...{
                        search,
                        setSearch,
                        active,
                        setActive,
                        storeId,
                        operationId,
                        setOperationId,
                    }}
                />
                <RowWrapper managers={managers.data} isLoading={managers.isFetching} fetchManagers={managers.refetch} />
            </Wrapper>
        </Drawer>
    );
});
