import { Button, DatePicker, Input, Select } from 'antd';
import { Wrapper } from './style';
import { Title } from '../../../Shared/Title';
import { Dispatch, SetStateAction, useState } from 'react';
import { useStores } from '../../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { FilterValue } from 'antd/es/table/interface';

export const MenuLeftovers = observer(
    ({
        setFilters,
    }: {
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { OperationStore } = useStores();
        const { operations } = OperationStore;
        const [opereytion, setOperation] = useState(undefined);

        const isShowAdditionalParams = ['Распил', 'Сверление таблетки'].includes(
            opereytion || '',
        );

        const cliarFiltersHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setFilters({});
        };

        return (
            <Wrapper>
                <div className="params">
                    <Title text="Остатки товара:" />
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
