import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useStores } from '../../../Store/useStores';
import { getDataBijouterie } from '../AssembleBijouterie/api';
import { FilterValue } from 'antd/es/table/interface';
import { iBijouterie } from '../../../../Shared/Types/interfaces';

export const useProps = () => {
    const { loginStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [selectedRows, setSelectedRows] = useState<iBijouterie[]>([]);
    const rowSelection = {
        onChange: (_selectedRowKeys: React.Key[], selectedRows: iBijouterie[]) => {
            setSelectedRows(selectedRows);
        },
        selectedRowKeys: selectedRows?.map((item: any) => item.key),
    };
    const bijouterie = useQuery([loginStore.user.storeId], getDataBijouterie, {
        enabled: !!loginStore.user.storeId,
    });

    return { bijouterie, filters, setFilters, rowSelection };
};
