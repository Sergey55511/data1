import { iDataIndex } from '../useProps';
import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction } from 'react';
import type { TableProps } from 'antd/es/table';
import { useColumns } from '../useColumps';

export const useProps = ({
    filters,
    setFilters,
    leftovers,
    selectRow,
}: {
    filters: Record<string, FilterValue | null>;
    setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    leftovers: iDataIndex[];
    selectRow: (i: number) => void;
}) => {
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

    return { columns, data, handleChange, filteredleftovers };
};
