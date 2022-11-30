import { Button, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { PlusOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useStores } from '../../../../../../../../../../../../Store/useStores';
import { useOperations } from '../../../../../../Hooks/useOperations';
import { useState } from 'react';
import { useAddOperation, useManagerOperations } from '../../Hooks';

export const AddOperation = observer(({ managerId }: { managerId: number }) => {
    const [operationId, setOperationId] = useState<number | undefined>();
    const { loginStore } = useStores();
    const operations = useOperations(loginStore.user.storeId);
    const managerOperations = useManagerOperations(loginStore.user.storeId, managerId);
    const addOperation = useAddOperation(managerOperations.refetch);

    const subbmitHandler = async () => {
        if (operationId) {
            await addOperation.mutate({ managerId, operationId });
            managerOperations.refetch();
            setOperationId(undefined);
        }
    };

    const disabled = !(managerId && operationId);

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
            <Button
                icon={<PlusOutlined />}
                onClick={subbmitHandler}
                disabled={disabled}
                loading={addOperation.isLoading}
            />
        </Wrapper>
    );
});
