import { Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { iManager } from '../../../../../../../../../../Shared/Types/interfaces';
import { useState } from 'react';
import { Operations } from './Operations';

export const Row = ({
    manager,
    fetchManagers,
}: {
    manager: iManager;
    fetchManagers: () => void;
}) => {
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
                    fetchManagers={fetchManagers}
                />
            )}
        </Wrapper>
    );
};
