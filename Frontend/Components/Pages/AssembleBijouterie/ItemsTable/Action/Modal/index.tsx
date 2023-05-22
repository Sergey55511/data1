import { Modal } from 'antd';
import { tDataSource } from '../../useData';
import { useProps } from './useProps';

export const ModalLeftovers = ({
    onCancel,
    item,
}: {
    onCancel: () => void;
    item: tDataSource;
}) => {
    const { leftovers } = useProps(item);

    return (
        <Modal open footer={null} onCancel={onCancel} width="100%">
            <h3>Остатки</h3>
            {leftovers.isFetched && 'Загрузка...'}
            {leftovers.data ? JSON.stringify(leftovers.data) : undefined}
        </Modal>
    );
};
