import { useQuery } from '@tanstack/react-query';
import { TableProps } from 'antd';
import { FilterValue } from 'antd/lib/table/interface';
import { Dispatch, SetStateAction, useState } from 'react';
import { RESULTASSEMBLE } from '../../../../../Shared/constants';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { getDataProduct } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';
import { useColumns } from './useColumns';

export const useProps = ({
    complect,
    setComplect,
}: {
    complect?: iDataProduct[];
    setComplect: Dispatch<SetStateAction<iDataProduct[]>>;
}) => {
    const { loginStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    const dataProduct = useQuery(
        ['dataProduct'],
        () => getDataProduct(loginStore.user.storeId, RESULTASSEMBLE.complect.id),
        { enabled: !!loginStore.user.storeId },
    );

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
