import { MenuLeftovers } from '../../../Shared/MenuLeftovers';
import { CounterWrapper, Wrapper } from './style';
import { TableApp } from '../../../Shared/Table';
import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';
import { DateFilter } from './dateFilter';
import { Counter } from '../../../Shared/Counter';

export const ListOperations = observer(() => {
    const props = useProps();

    return (
        <>
            <Wrapper>
                <MenuLeftovers
                    text="Лист операций:"
                    setFilters={props.setFilters}
                    content={<DateFilter {...props} />}
                />
            </Wrapper>
            <CounterWrapper>
                <div>
                    <strong>Приход</strong>
                    <Counter
                        data={props.filteredleftovers}
                        countKey="countItemsIn"
                        widthKey="widthIn"
                    />
                </div>
                <div>
                    <strong>Расход</strong>
                    <Counter
                        data={props.filteredleftovers}
                        countKey="countItemsOut"
                        widthKey="widthOut"
                    />
                </div>
            </CounterWrapper>

            <TableApp
                columns={props.columns}
                dataSource={props.data}
                onChange={props.handleChange}
                xScroll={1400}
            />
        </>
    );
});
