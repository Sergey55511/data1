import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStores } from '../../../../../../Store/useStores';
import { RowWrapper } from './Components/RowWrapper';
import { Search } from './Components/Search';
import { useData } from './Hooks/useData';
import { Wrapper } from './style';

export const SupportManagers = observer(({ onClose }: { onClose?: () => void }) => {
    const { loginStore } = useStores();
    const [search, setSearch] = useState('');
    const managers = useData({ storeId: loginStore.user.storeId, search });

    console.log('managers', managers.data);

    return (
        <Drawer width={600} open title="Работники:" onClose={onClose}>
            <Wrapper>
                <Search setSearch={setSearch} />
                <RowWrapper managers={managers.data} />
            </Wrapper>
        </Drawer>
    );
});
