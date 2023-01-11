import { useEffect, useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { useStores } from '../../../Store/useStores';
import { iDataProduct } from '../../../../Shared/Types/interfaces';

export const useProps = () => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const { loginStore, OperationStore } = useStores();
    const [selectedRows, setSelectedRows] = useState<iDataProduct[]>([]);
    const rowSelection = {
        onChange: (_selectedRowKeys: React.Key[], selectedRows: iDataProduct[]) => {
            setSelectedRows(selectedRows);
        },
        selectedRowKeys: selectedRows?.map((item: any) => item.key),
    };

    useEffect(() => {
        if (loginStore.user.storeId) OperationStore.getLeftovers(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

    return { filters, setFilters, rowSelection };
};
