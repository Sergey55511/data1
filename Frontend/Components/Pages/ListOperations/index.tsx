import { MenuLeftovers } from '../../Shared/MenuLeftovers';
import { Wrapper } from './style';
import { TableApp } from '../../Shared/Table';
import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';

export const ListOperations = observer(() => {
    const { setFilters, handleChange, listOperations, columns } = useProps();

    return (
        <Wrapper>
            <MenuLeftovers text="Лист операций:" setFilters={setFilters} />
            <TableApp
                columns={columns}
                dataSource={listOperations.data}
                onChange={handleChange}
            />
        </Wrapper>
    );
});
