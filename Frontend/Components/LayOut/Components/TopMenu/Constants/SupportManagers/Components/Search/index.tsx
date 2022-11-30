import { Button, Input } from 'antd';
import { Wrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface iState {
    search: '';
    isHidden: boolean;
}

export const Search = ({
    setSearch,
}: {
    setSearch: Dispatch<SetStateAction<string>>;
}) => {
    const [state, setState] = useState<iState | undefined>(undefined);
    const hiddenHandler = () => {
        setState((prev) => ({ search: prev?.search || '', isHidden: !prev?.isHidden }));
    };

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <Wrapper>
            <Input
                placeholder="Поиск"
                allowClear
                suffix={<SearchOutlined />}
                onChange={inputHandler}
            />
            <Button onClick={hiddenHandler}>
                {state?.isHidden ? 'Активные' : 'Скрытые'}
            </Button>
        </Wrapper>
    );
};
