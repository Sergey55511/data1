import { Wrapper } from './style';
import { Title } from '../../../Shared/Title';
import { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';
import { FilterValue } from 'antd/es/table/interface';
import { useStores } from '../../../../Store/useStores';

export const MenuLeftovers = observer(
    ({
        setFilters,
    }: {
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { loginStore } = useStores();
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
