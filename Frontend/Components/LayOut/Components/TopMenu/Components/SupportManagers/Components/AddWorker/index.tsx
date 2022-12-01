import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useState } from 'react';
import { useAddManager } from '../../Hooks/useAddManager';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../../../../Store/useStores';

export const AddWorker = observer(({ fetch }: { fetch: () => void }) => {
    const { loginStore } = useStores();
    const [name, setState] = useState('');

    const postManager = useAddManager(fetch);

    const subbmitHandler = () => {
        postManager.mutate({ name, storeId: loginStore.user.storeId });
        setState('');
    };

    return (
        <Wrapper>
            <Input
                value={name}
                onChange={(e) => setState(e.target.value)}
                placeholder="Введите имя сотрудника"
                className="input"
            />
            <Button onClick={subbmitHandler} icon={<PlusOutlined />} disabled={!name} />
        </Wrapper>
    );
});
