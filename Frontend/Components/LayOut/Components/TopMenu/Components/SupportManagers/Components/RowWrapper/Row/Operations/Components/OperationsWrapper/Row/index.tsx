import { Wrapper } from './style';
import { DeleteOutlined } from '@ant-design/icons';
import { iOperation } from '../../../../../../../../../../../../../../Shared/Types/interfaces';
import { Button } from 'antd';
import { useRemoveOperation } from '../../../Hooks';

export const Row = ({
    managerId,
    operation,
    fetch,
}: {
    managerId: number;
    operation: iOperation;
    fetch: () => void;
}) => {
    const removeOperation = useRemoveOperation(fetch);

    const removeHandler = () => {
        removeOperation.mutate({ managerId, operationId: operation.id });
    };

    return (
        <Wrapper>
            <div className="operation">{operation.operation}</div>
            <Button
                onClick={removeHandler}
                icon={<DeleteOutlined />}
                loading={removeOperation.isLoading}
            />
        </Wrapper>
    );
};
