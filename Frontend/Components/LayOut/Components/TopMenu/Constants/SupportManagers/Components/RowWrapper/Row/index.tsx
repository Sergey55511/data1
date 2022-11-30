import { Button, Select } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { iManager } from '../../../../../../../../../../Shared/Types/interfaces';
import { useOperations } from '../../../Hooks/useOperations';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../../../../../Store/useStores';
import { useState } from 'react';
import { Operations } from './Operations';

export const Row = observer(({ manager }: { manager: iManager }) => {
    const { loginStore } = useStores();
    const [isOpenOnerations, setIsOpenOperations] = useState(false);

    return (
        <Wrapper>
            <div className="name">{manager.name}</div>
            <Button type="link" onClick={() => setIsOpenOperations(true)}>
                Операции
            </Button>
            <Button
                type="text"
                icon={manager.active ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            />
            {isOpenOnerations && (
                <Operations
                    onClose={() => setIsOpenOperations(false)}
                    worker={manager}
                />
            )}
        </Wrapper>
    );
});
