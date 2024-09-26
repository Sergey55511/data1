import { TableLeftOvers } from './Table';
import { MenuLeftovers } from './MenuLeftovers';
import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';

export default observer(() => {
    const { setFilters, filters, rowSelection, selectedRows, products, setSelectedRows } =
        useProps();

    return (
        <>
            <MenuLeftovers {...{ setFilters, selectedRows, products, setSelectedRows }} />
            <TableLeftOvers
                {...{ filters, setFilters, rowSelection, products, selectedRows }}
            />
        </>
    );
});
