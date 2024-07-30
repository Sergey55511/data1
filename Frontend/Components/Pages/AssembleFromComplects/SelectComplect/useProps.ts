import { UseQueryResult } from '@tanstack/react-query';
import { TableProps } from 'antd';
import { FilterValue } from 'antd/lib/table/interface';
import { Dispatch, SetStateAction, useState } from 'react';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { eTypeButton } from '../useProps';
import { useColumns } from './useColumns';

export interface iProps {
    complect?: iDataProduct[];
    setComplect: Dispatch<SetStateAction<iDataProduct[]>>;
    dataProduct: UseQueryResult<iDataProduct[], unknown>;
    stateButton: eTypeButton;
}
export const useProps = ({ complect, setComplect, dataProduct }: iProps) => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    const data = dataProduct.data?.map((item) => ({ ...item, key: item.articleId }));

    const handleChange: TableProps<iDataProduct>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
    };

    const rowSelection: TableProps<iDataProduct>['rowSelection'] = {
        type: 'radio',
        onChange: (_selectedRowKeys: React.Key[], selectedRows: iDataProduct[]) => {
            setComplect(selectedRows);
        },
        selectedRowKeys: complect?.map((item) => item.articleId ?? ''),
    };

    const { columns } = useColumns({ data: dataProduct.data, filters });

    return { dataProduct, data, handleChange, rowSelection, columns };
};
