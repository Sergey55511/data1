import { TableLeftOvers } from './Table';
import { MenuLeftovers } from './MenuLeftovers';
import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';
import { Counter } from '../../Shared/Counter';

export default observer(() => {
    const { setFilters, filters, rowSelection, selectedRows, products, setSelectedRows } =
        useProps();

    return (
        <>
            <MenuLeftovers {...{ setFilters, selectedRows, products, setSelectedRows }} />
            <Counter data={selectedRows ?? []} countKey="count" widthKey="width" />
            <TableLeftOvers {...{ filters, setFilters, rowSelection, products }} />
        </>
    );
});
