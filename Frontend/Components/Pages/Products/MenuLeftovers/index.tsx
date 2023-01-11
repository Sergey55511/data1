import { Wrapper } from './style';
import { Title } from '../../../Shared/Title';
import { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';
import { FilterValue } from 'antd/es/table/interface';
import { Button, Dropdown, Menu } from 'antd';
import { Actions } from './actions';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';

export const MenuLeftovers = observer(
    ({
        setFilters,
        selectedRows,
    }: {
        selectedRows: iDataProduct[];
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const cliarFiltersHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setFilters({});
        };

        return (
            <Wrapper>
                <div className="params">
                    <div className="titleWrapper">
                        <Title text="Остатки готовых изделий:" />
                        <Actions selectedRows={selectedRows} />
                    </div>
                    <div className="settings">
                        <a href="#" onClick={cliarFiltersHandler}>
                            Очистить фильтры
                        </a>
                    </div>
                </div>
            </Wrapper>
        );
    },
);
