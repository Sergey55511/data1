import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue, TableRowSelection } from 'antd/es/table/interface';
import { TableApp } from '../../../Shared/Table';
import { useColumns } from './useСolumns';
import { UseQueryResult } from '@tanstack/react-query';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
        rowSelection,
        products,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        rowSelection?: TableRowSelection<iDataProduct>;
        products: UseQueryResult<iDataProduct[], unknown>;
    }) => {
        const { columns, data } = useColumns(filters, products);

        const handleChange: TableProps<iDataProduct>['onChange'] = (
            _pagination,
            filters,
            _sorter,
        ) => {
            setFilters(filters);
            // setSortedInfo(sorter as SorterResult<DataType>);
        };

        return (
            <>
                <TableApp
                    columns={columns}
                    dataSource={data}
                    onChange={handleChange}
                    rowSelection={rowSelection}
                />
            </>
        );
    },
);
