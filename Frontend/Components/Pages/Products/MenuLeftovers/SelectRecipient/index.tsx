import { UseQueryResult } from '@tanstack/react-query';
import { Button, DatePicker, Input, Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { iDataProduct, iRecipient } from '../../../../../../Shared/Types/interfaces';
import { SelectField } from '../../../../Shared/SelectField';
import { Wrapper } from './style';
import { ListModels } from '../TableItems';
import { iProps, useProps } from './useProps';
import { disabledDateAfterToday } from '../../../../Helpers';
import { Moment } from 'moment';

const { Search } = Input;

export const SelectRecipient = (params: iProps) => {
    const {
        newRecipient,
        setNewRecipient,
        addRecipient,
        addRecipientHandler,
        setNumDocumentHandler,
        disabled,
    } = useProps(params);

    return (
        <Modal open onCancel={params.onCancel} footer={false}>
            <Wrapper>
                <div className="title">Выберите получателя</div>
                <div className="inputWrapper">
                    <DatePicker
                        style={{ width: '100%' }}
                        value={params.date}
                        onChange={(v) => params.setDate(v)}
                        format="DD.MM.YYYY"
                        disabledDate={disabledDateAfterToday}
                    />
                </div>
                {params.isShowNumDocument && (
                    <div className="inputWrapper">
                        <Input
                            value={params.numDocument}
                            onChange={setNumDocumentHandler}
                            allowClear
                            placeholder="№ документа"
                        />
                    </div>
                )}
                {params.isShowAddInput && (
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
                        value={params.recipientId}
                        onChange={(v) => params.setRecipientId(v)}
                        options={params.recipient.data?.map((item) => ({
                            value: item.id,
                            caption: item.recipient,
                        }))}
                        selectProps={{ loading: params.recipient.isFetching }}
                    />
                </div>
                <div className="listItems">
                    <ListModels selectedRows={params.selectedRows} />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={params.submitHandler}
                        loading={params.isLoading}
                        disabled={disabled}
                    >
                        Отгрузить
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    );
};
