import { Button } from 'antd';
import { ActionWrapper } from './style';
import { DeleteOutlined } from '@ant-design/icons';
import { ModalLeftovers } from './Modal';
import { useState } from 'react';
import { tDataSource } from '../useData';

export const Action = ({ item }: { item: tDataSource }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <>
            {isOpenModal && (
                <ModalLeftovers onCancel={() => setIsOpenModal(false)} item={item} />
            )}
            <ActionWrapper>
                <Button onClick={() => setIsOpenModal(true)}>Выбрать</Button>
                <Button icon={<DeleteOutlined />} />
            </ActionWrapper>
        </>
    );
};
