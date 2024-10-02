import { iBijouterie, iDataProduct } from '../../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue, TableRowSelection } from 'antd/es/table/interface';
import { TableApp } from '../../../Shared/Table';
import { useColumns } from './useСolumns';
import { UseQueryResult } from '@tanstack/react-query';
import { Counter } from '../../../Shared/Counter';
import { TotalCounter } from './TotalCounter';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
        rowSelection,
        bijouterie,
        selectedRows,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        rowSelection?: TableRowSelection<iBijouterie>;
        bijouterie: UseQueryResult<iBijouterie[], unknown>;
        selectedRows: iDataProduct[];
    }) => {
        const { columns, data, filteredleftovers } = useColumns(filters, bijouterie);

        const handleChange: TableProps<iBijouterie>['onChange'] = (
            _pagination,
            filters,
            _sorter,
        ) => {
            setFilters(filters);
            // setSortedInfo(sorter as SorterResult<DataType>);
        };

        return (
            <>
                <TotalCounter
                    selectedRows={selectedRows}
                    filteredleftovers={filteredleftovers}
                />
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
