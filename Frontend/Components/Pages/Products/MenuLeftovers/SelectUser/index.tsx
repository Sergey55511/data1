import { UseQueryResult } from '@tanstack/react-query';
import { Button, Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { iDataProduct, iManager } from '../../../../../../Shared/Types/interfaces';
import { SelectField } from '../../../../Shared/SelectField';
import { ListModels } from '../TableItems';
import { Wrapper } from './style';

export const SelectUser = ({
    onCancel,
    reAssembleHandler,
    isLoading,
    managerId,
    setManagerId,
    managers,
    selectedRows,
}: {
    onCancel: () => void;
    reAssembleHandler: () => Promise<void>;
    isLoading?: boolean;
    managerId: number | undefined;
    setManagerId: Dispatch<SetStateAction<number | undefined>>;
    managers: UseQueryResult<iManager[], unknown>;
    selectedRows: iDataProduct[];
}) => {
    return (
        <Modal open onCancel={onCancel} footer={false}>
            <Wrapper>
                <div className="title">Выберите исполнителя</div>
                <div className="selectWrapper">
                    <SelectField
                        placeholder="Исполнитель"
                        value={managerId}
                        onChange={(v) => setManagerId(v)}
                        options={managers.data?.map((item) => ({
                            value: item.id,
                            caption: item.name,
                        }))}
                        selectProps={{ loading: managers.isFetching }}
                    />
                </div>
                <div className="listItems">
                    <ListModels selectedRows={selectedRows} />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={reAssembleHandler}
                        loading={isLoading}
                        disabled={!managerId}
                    >
                        Разобрать
                    </Button>
                </div>
            </Wrapper>
        </Modal>
    );
};
