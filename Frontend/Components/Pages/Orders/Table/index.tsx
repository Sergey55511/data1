import { observer } from 'mobx-react-lite';
import { TableApp } from '../../../Shared/Table';
import { ROUTES } from '../../constants';
import { useProps } from './useProps';

export const OrdersTable = observer(() => {
    const { handleChange, router, data, columns } = useProps();

    return (
        <TableApp
            onRow={(record, _rowIndex) => {
                return {
                    onDoubleClick: (_event) => {
                        router.push(`${ROUTES.getOrder}/${record.pp}`);
                    },
                };
            }}
            columns={columns}
            dataSource={data}
            onChange={handleChange}
        />
    );
});
