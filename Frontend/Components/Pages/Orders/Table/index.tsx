import { observer } from 'mobx-react-lite';
import { TableApp } from '../../../Shared/Table';
import { ROUTES } from '../../constants';
import { useProps } from './useProps';

export const OrdersTable = observer(({ isGetOut }: { isGetOut?: boolean }) => {
    const { handleChange, onRowHandler, data, columns } = useProps(isGetOut);

    return (
        <TableApp
            onRow={onRowHandler}
            columns={columns}
            dataSource={data}
            onChange={handleChange}
        />
    );
});
