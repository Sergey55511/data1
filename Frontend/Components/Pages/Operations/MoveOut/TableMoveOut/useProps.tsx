import { Dispatch, SetStateAction, useEffect } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { iDataIndex } from '../UseProps';
import type { TableProps } from 'antd/es/table';
import { InputF } from './inputF';
import { useColumns } from '../useColumps';
import { useStores } from '../../../../../Store/useStores';
import { STORES } from '../../../../../../Shared/constants';

export const useProps = ({
    filters,
    setFilters,
    leftovers,
    removeRow,
    onChange,
    isInventory,
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
    isInventory?: boolean;
}) => {
    const { loginStore } = useStores();
    const isMSC = loginStore.user.storeId == STORES.Moscow.id;
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

    const { columns, filteredleftovers } = useColumns({ filters, leftovers });

    columns.push({
        dataIndex: 'widthOut',
        title: isInventory ? 'Факт гр.' : 'Отгрузка гр.',
        width: '115px',
        render: (value, record) => {
            return (
                <InputF
                    value={value}
                    onChangeHandler={(v: any) => onChange(record, 'widthOut', v)}
                    isError={
                        isInventory
                            ? undefined
                            : (record.width || 0) - (record.widthOut || 0) < 0
                    }
                />
            );
        },
    });
    if (isMSC)
        columns.push({
            dataIndex: 'countItemsOut',
            title: isInventory ? 'Факт шт.' : 'Отгрузка шт.',
            width: '115px',
            render: (value, record) => {
                return (
                    <InputF
                        value={value}
                        onChangeHandler={(v: any) => onChange(record, 'countItemsOut', v)}
                        isError={
                            isInventory
                                ? undefined
                                : (record.count || 0) - (record.countItemsOut || 0) < 0
                        }
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

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            leftovers.forEach((item, index) => {
                if (!selectedRowKeys.includes(index)) {
                    if (item.index != undefined) removeRow(item.index);
                }
            });
        },
        selectedRowKeys: leftovers.map((_, index) => index),
    };

    return { columns, data, handleChange, filteredleftovers, rowSelection };
};
