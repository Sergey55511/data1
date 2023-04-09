import { iDataIndex } from '../UseProps';
import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction } from 'react';
import type { TableProps } from 'antd/es/table';
import { useColumns } from '../useColumps';
import { iData } from '../../../../../../Shared/Types/interfaces';

export interface iProps {
    filters: Record<string, FilterValue | null>;
    setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    leftovers: iDataIndex[];
    selectRow: (i: number) => void;
    setSelectedRows: Dispatch<SetStateAction<number[]>>;
    selectedRows: number[];
}

export const useProps = ({
    filters,
    setFilters,
    leftovers,
    setSelectedRows,
    selectedRows,
}: iProps) => {
    const data: iDataIndex[] = leftovers.map((item, index) => ({
        ...item,
        key: index,
    }));

    const { columns, filteredleftovers } = useColumns({ filters, leftovers });

    const handleChange: TableProps<iDataIndex>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            _selectedRows: iData[],
            target: { type: string },
        ) => {
            if (target.type == 'all') {
                if (selectedRowKeys.length) {
                    if (selectedRows.length == filteredleftovers.length) {
                        setSelectedRows([]);
                    } else {
                        setSelectedRows(
                            filteredleftovers.map((item) =>
                                item.index ? +item.index : 0,
                            ),
                        );
                    }
                    return;
                }
            }
            setSelectedRows(selectedRowKeys.map((item) => +item));
        },
        selectedRowKeys: selectedRows,
    };

    return { columns, data, handleChange, filteredleftovers, rowSelection };
};
