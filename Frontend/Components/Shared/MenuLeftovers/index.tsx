import { Wrapper } from './style';
import { Title } from '../Title';
import { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';
import { FilterValue } from 'antd/es/table/interface';

export const MenuLeftovers = observer(
    ({
        text = 'Остатки товара:',
        setFilters,
        content,
    }: {
        text?: string;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        content?: JSX.Element;
    }) => {
        const cliarFiltersHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setFilters({});
        };

        return (
            <Wrapper>
                <div className="params">
                    <Title text={text} />
                    {content}
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
