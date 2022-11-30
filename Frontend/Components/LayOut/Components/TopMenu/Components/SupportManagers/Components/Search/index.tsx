import { Button, Input, Select } from 'antd';
import { Wrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useOperations } from '../../Hooks/useOperations';

export const Search = ({
    storeId,
    search,
    active,
    setSearch,
    setActive,
    operationId,
    setOperationId,
}: {
    storeId: number;
    operationId: number;
    search: string;
    active?: boolean;
    setSearch: Dispatch<SetStateAction<string>>;
    setActive: Dispatch<SetStateAction<boolean | undefined>>;
    setOperationId: Dispatch<SetStateAction<number>>;
}) => {
    const operations = useOperations(storeId);

    const hiddenHandler = () => {
        setActive((prev) => {
            switch (prev) {
                case true:
                    return false;
                case false:
                    return undefined;
            }
            return true;
        });
    };

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const buttonLabel = (() => {
        switch (active) {
            case true:
                return 'Активные';
            case false:
                return 'Не активные';
        }
        return 'Все';
    })();

    return (
        <Wrapper>
            <Input
                placeholder="Поиск"
                allowClear
                suffix={<SearchOutlined />}
                value={search}
                onChange={inputHandler}
            />
            <Select className="select" value={operationId} onChange={setOperationId}>
                <Select.Option value={0}>Все</Select.Option>
                {operations.data?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                        {item.operation}
                    </Select.Option>
                ))}
            </Select>
            <Button onClick={hiddenHandler}>{buttonLabel}</Button>
        </Wrapper>
    );
};
