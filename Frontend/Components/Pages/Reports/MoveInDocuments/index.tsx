import { MenuLeftovers } from '../../../Shared/MenuLeftovers';
import { Wrapper } from './style';
import { TableApp } from '../../../Shared/Table';
import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';
import { DateFilter } from './dateFilter';

export const MoveInDocument = observer(() => {
    const props = useProps();

    return (
        <>
            <Wrapper>
                <MenuLeftovers
                    text="Закупки:"
                    setFilters={props.setFilters}
                    content={<DateFilter {...props} />}
                />
            </Wrapper>
            <TableApp
                columns={props.columns}
                dataSource={props.data}
                onChange={props.handleChange}
            />
        </>
    );
});
