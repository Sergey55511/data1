import { Button, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { PlusOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useStores } from '../../../../../../../../../../../../Store/useStores';
import { useOperations } from '../../../../../../Hooks/useOperations';
import { useState } from 'react';

export const AddOperation = observer(() => {
    const [operationId, setOperationId] = useState<number | undefined>();
    const { loginStore } = useStores();
    const operations = useOperations(loginStore.user.storeId);

    const subbmitHandler = () => {
        setOperationId(undefined);
    };

    return (
        <Wrapper>
            <Select
                className="select"
                value={operationId}
                onChange={setOperationId}
                placeholder="Выберите операцию"
            >
                {operations.data?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.operation}
                    </Select.Option>
                ))}
            </Select>
            <Button icon={<PlusOutlined />} onClick={subbmitHandler} />
        </Wrapper>
    );
});
