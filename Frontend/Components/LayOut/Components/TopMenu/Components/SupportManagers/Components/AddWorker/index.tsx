import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useState } from 'react';
import { useAddManager } from '../../Hooks/useAddManager';

export const AddWorker = ({ fetch }: { fetch: () => void }) => {
    const [name, setState] = useState('');

    const postManager = useAddManager(fetch);

    const subbmitHandler = () => {
        postManager.mutate({ name });
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
};
