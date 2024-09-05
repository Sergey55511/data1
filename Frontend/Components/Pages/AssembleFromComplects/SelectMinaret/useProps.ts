import { UseQueryResult } from '@tanstack/react-query';
import { FilterValue } from 'antd/lib/table/interface';
import { Dispatch, SetStateAction, useState } from 'react';
import { useColumns } from './useColumns';
import { TableProps } from 'antd';
import { iData, iDataProduct } from '../../../../../Shared/Types/interfaces';
import { eTypeButton } from '../useProps';
import { WORKPIECETYPE } from '../../../../../Shared/constants';

export interface iProps {
    stateButton: eTypeButton;
    complectItems: iData[];
    setComplectItems: Dispatch<SetStateAction<iData[]>>;
    assembleLeftovers: UseQueryResult<iData[], unknown>;
    complect: iDataProduct[];
}
export const useProps = ({
    complectItems,
    setComplectItems,
    assembleLeftovers,
    complect,
}: iProps) => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const complectItem = complect[0];
    const data = assembleLeftovers.data
        ?.filter((item) => {
            if (item.workpieceTypeId == WORKPIECETYPE.ball.id)
                return item.fullModelId == complectItem?.fullModelId;
            return true;
        })
        .map((item, index) => ({ ...item, key: index }));

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
