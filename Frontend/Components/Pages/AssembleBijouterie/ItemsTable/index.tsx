import { Table } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useColumns } from './useColumns';
import { tDataSource } from './useData';

export const ItemsTable = ({
    dataSource,
    setDataSource,
}: {
    dataSource?: tDataSource[];
    setDataSource: Dispatch<SetStateAction<tDataSource[] | undefined>>;
}) => {
    const { columns } = useColumns(setDataSource);

    return <Table dataSource={dataSource} columns={columns} />;
};
