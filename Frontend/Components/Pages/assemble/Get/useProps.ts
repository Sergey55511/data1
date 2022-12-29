import { TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { tValue } from '../../../Shared/InputNumber';
import { useColumns } from './useColumns';

export interface iProps {
    selectedRows: iData[];
    setSelectedRows: Dispatch<SetStateAction<iData[]>>;
}

export const useProps = ({ selectedRows, setSelectedRows }: iProps) => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const setValue = (index: number, field: string, value: tValue) => {
        const key = field as keyof iData;
        setSelectedRows((prev) => {
            prev[index][key] = value;

            return [...prev];
        });
    };

    const { columns } = useColumns({ data: selectedRows, filters, setValue });

    useEffect(() => {
        setSelectedRows((prev) => {
            const res = prev.map((item) => ({
                ...item,
                widthOut: item.width,
                countItemsOut: item.count,
            }));
            return [...res];
        });
    }, []);
    return { columns, handleChange };
};