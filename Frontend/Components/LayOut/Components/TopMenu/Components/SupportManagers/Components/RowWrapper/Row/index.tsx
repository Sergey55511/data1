import { Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, EditOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { iManager } from '../../../../../../../../../../Shared/Types/interfaces';
import { useState } from 'react';
import { Operations } from './Components/Operations';
import { useRemoveManager } from '../../../Hooks/useRemoveManager';
import { usePatchManager } from '../../../Hooks/usePatchManager';
import { EditModal } from './Components/EditModal';

export const Row = ({
    manager,
    fetchManagers,
}: {
    manager: iManager;
    fetchManagers: () => void;
}) => {
    const [isOpenOnerations, setIsOpenOperations] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const removeManager = useRemoveManager(fetchManagers);
    const patchManager = usePatchManager(fetchManagers);

    const removeHandler = () => {
        if (manager.active) removeManager.mutate({ managerId: manager.id });
        if (!manager.active)
            patchManager.mutate({ id: manager.id, params: { active: true } });
    };

    return (
        <Wrapper>
            {isShowEditModal && (
                <EditModal
                    onCancel={() => setIsShowEditModal(false)}
                    manager={manager}
                    fetchManagers={fetchManagers}
                />
            )}
            <div className="name">{manager.name}</div>
            <Button type="link" onClick={() => setIsOpenOperations(true)}>
                Операции
            </Button>
            <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => setIsShowEditModal(true)}
                loading={removeManager.isLoading}
            />
            <Button
                type="text"
                icon={manager.active ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                onClick={removeHandler}
                loading={removeManager.isLoading}
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
