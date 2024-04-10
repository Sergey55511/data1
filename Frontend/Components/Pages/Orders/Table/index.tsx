import { observer } from 'mobx-react-lite';
import { Counter } from '../../../Shared/Counter';
import { TableApp } from '../../../Shared/Table';
import { iProps, useProps } from './useProps';

export const OrdersTable = observer((props: iProps) => {
    const { handleChange, onRowHandler, data, columns, filteredleftovers, countKey } =
        useProps(props);

    return (
        <>
            <Counter data={filteredleftovers} countKey={countKey} widthKey="width" />
            <TableApp
                onRow={onRowHandler}
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                xScroll={1400}
            />
        </>
    );
});
