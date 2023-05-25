import { Table } from 'antd';
import { iBigouterueBridje } from '../../../../../Shared/Types/interfaces';
import { useColumns } from './useColumns';
import { useData } from './useData';

export const ItemsTable = ({ data }: { data?: iBigouterueBridje[] }) => {
    const { dataSource, setDataSource } = useData(data);

    const { columns } = useColumns(setDataSource);
    return <Table dataSource={dataSource} columns={columns} />;
};
