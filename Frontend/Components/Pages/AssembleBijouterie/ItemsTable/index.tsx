import { Table } from 'antd';
import { iBigouterueBridje } from '../../../../../Shared/Types/interfaces';
import { useColumns } from './useColumns';
import { useData } from './useData';

export const ItemsTable = ({ data }: { data?: iBigouterueBridje[] }) => {
    const { dataSource } = useData(data);

    const { columns } = useColumns();
    return <Table dataSource={dataSource} columns={columns} />;
};
