import { TableApp } from '../../../../Shared/Table';
import { useColumns } from './useColumns';
import { useGetData } from './useGetData';

export const ComplectItems = () => {
    const columns = useColumns();
    const data = useGetData();
    return <TableApp columns={columns} dataSource={data} />;
};
