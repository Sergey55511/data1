import { TableLeftOvers } from './Table';
import { MenuLeftovers } from './MenuLeftovers';
import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';

export default observer(() => {
    const { setFilters, filters, rowSelection, selectedRows } = useProps();

    return (
        <>
            <MenuLeftovers setFilters={setFilters} selectedRows={selectedRows} />
            <TableLeftOvers {...{ filters, setFilters, rowSelection }} />
        </>
    );
});
