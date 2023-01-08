import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableApp } from '../../../Shared/Table';
import { useColumns } from './useСolumns';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { columns, data } = useColumns(filters);

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
                />
            </>
        );
    },
);
