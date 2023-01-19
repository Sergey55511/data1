import { UseQueryResult } from '@tanstack/react-query';
import { Button, Input, Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { iDataProduct, iRecipient } from '../../../../../../Shared/Types/interfaces';
import { SelectField } from '../../../../Shared/SelectField';
import { Wrapper } from './style';
import { ListModels } from '../TableItems';
import { useProps } from './useProps';

const { Search } = Input;

export const SelectRecipient = ({
    onCancel,
    submitHandler,
    isLoading,
    recipientId,
    setRecipientId,
    recipient,
    isShowAddInput,
    selectedRows,
}: {
    onCancel: () => void;
    submitHandler: () => Promise<void>;
    isLoading?: boolean;
    recipientId: number | undefined;
    setRecipientId: Dispatch<SetStateAction<number | undefined>>;
    recipient: UseQueryResult<iRecipient[], unknown>;
    isShowAddInput?: boolean;
    selectedRows: iDataProduct[];
}) => {
    const { newRecipient, setNewRecipient, addRecipient, addRecipientHandler } = useProps(
        recipient,
        setRecipientId,
    );
    return (
        <Modal open onCancel={onCancel} footer={false}>
            <Wrapper>
                <div className="title">Выберите получателя</div>
                {isShowAddInput && (
                    <div className="inputWrapper">
                        <Search
                            value={newRecipient}
                            onChange={(e) => setNewRecipient(e.target.value)}
                            placeholder="Добавить получателя"
                            allowClear
                            enterButton="Добавить"
                            onSearch={addRecipientHandler}
                            loading={addRecipient.isLoading}
                        />
                    </div>
                )}
                <div className="selectWrapper">
                    <SelectField
                        placeholder="Получатель"
                        value={recipientId}
                        onChange={(v) => setRecipientId(v)}
                        options={recipient.data?.map((item) => ({
                            value: item.id,
                            caption: item.recipient,
                        }))}
                        selectProps={{ loading: recipient.isFetching }}
                    />
                </div>
                <div className="listItems">
                    <ListModels selectedRows={selectedRows} />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={submitHandler}
                        loading={isLoading}
                        disabled={!recipientId}
                    >
                        Отгрузить
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    );
};
