import { Wrapper } from './style';
import { DeleteOutlined } from '@ant-design/icons';
import { iOperation } from '../../../../../../../../../../../../../../Shared/Types/interfaces';
import { Button } from 'antd';

export const Row = ({
    managerId,
    operation,
}: {
    managerId: number;
    operation: iOperation;
}) => {
    return (
        <Wrapper>
            <div className="operation">{operation.operation}</div>
            <Button icon={<DeleteOutlined />} />
        </Wrapper>
    );
};
