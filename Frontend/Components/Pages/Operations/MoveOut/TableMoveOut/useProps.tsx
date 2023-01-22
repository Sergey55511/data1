import { Dispatch, SetStateAction, useEffect } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { iDataIndex } from '../useProps';
import { getColumnProps } from '../../../../Shared/Table/Helpers/getColumnProps';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import { InputF } from './inputF';
import { useColumns } from '../useColumps';

export const useProps = ({
    filters,
    setFilters,
    leftovers,
    removeRow,
    onChange,
}: {
    filters: Record<string, FilterValue | null>;
    setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    leftovers: iDataIndex[];
    removeRow: (i: number) => void;
    onChange: (
        record: iDataIndex,
        key: keyof iDataIndex,
        value: iDataIndex[keyof iDataIndex],
    ) => void;
}) => {
    useEffect(() => {
        for (const item of leftovers) {
            if (!item.widthOut) onChange(item, 'widthOut', item.width);
            if (!item.countItemsOut) onChange(item, 'countItemsOut', item.countItemsOut);
        }
    }, []);
    const data: iDataIndex[] = leftovers.map((item, index) => ({
        ...item,
        key: index,
    }));

    const columns: ColumnsType<iDataIndex> = useColumns({ filters, leftovers });

    columns.push({
        dataIndex: 'widthOut',
        title: 'Отгрузка гр.',
        width: '115px',
        render: (value, record) => {
            return (
                <InputF
                    value={value}
                    onChangeHandler={(v: any) => onChange(record, 'widthOut', v)}
                    isError={(record.width || 0) - (record.widthOut || 0) < 0}
                />
            );
        },
    });
    columns.push({
        dataIndex: 'countItemsOut',
        title: 'Отгрузка шт.',
        width: '115px',
        render: (value, record) => {
            return (
                <InputF
                    value={value}
                    onChangeHandler={(v: any) => onChange(record, 'countItemsOut', v)}
                    isError={(record.count || 0) - (record.countItemsOut || 0) < 0}
                />
            );
        },
    });

    const handleChange: TableProps<iDataIndex>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    return { columns, data, handleChange };
};
