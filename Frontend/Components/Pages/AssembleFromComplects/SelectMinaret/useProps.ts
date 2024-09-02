import { UseQueryResult } from '@tanstack/react-query';
import { FilterValue } from 'antd/lib/table/interface';
import { Dispatch, SetStateAction, useState } from 'react';
import { useColumns } from './useColumns';
import { TableProps } from 'antd';
import { iData } from '../../../../../Shared/Types/interfaces';
import { eTypeButton } from '../useProps';

export interface iProps {
    stateButton: eTypeButton;
    complectItems: iData[];
    setComplectItems: Dispatch<SetStateAction<iData[]>>;
    assembleLeftovers: UseQueryResult<iData[], unknown>;
}
export const useProps = ({
    complectItems,
    setComplectItems,
    assembleLeftovers,
}: iProps) => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    const data = assembleLeftovers.data?.map((item, index) => ({ ...item, key: index }));

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
    };
    const rowSelection: TableProps<iData>['rowSelection'] = {
        type: 'checkbox',
        onChange: (_selectedRowKeys: React.Key[], selectedRows: iData[]) => {
            setComplectItems(selectedRows);
        },
        selectedRowKeys: complectItems?.map((item) => item.key!),
    };

    const { columns } = useColumns({ data: assembleLeftovers.data, filters });

    return { assembleLeftovers, data, columns, handleChange, rowSelection };
};
