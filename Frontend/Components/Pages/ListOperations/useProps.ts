import { useQuery } from '@tanstack/react-query';
import { useStores } from '../../../Store/useStores';
import * as api from '../../../../Frontend/Store/OperationStore/Api';
import { FilterValue } from 'antd/lib/table/interface';
import { useState } from 'react';
import { iData } from '../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { useColumns } from './useСolumns';

export const useProps = () => {
    const { loginStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const listOperations = useQuery(
        ['listOperations', loginStore.user.storeId],
        () => api.listOperations({ month: 1, year: 2023 }),
        { enabled: !!loginStore.user.storeId },
    );

    const { columns } = useColumns(filters, listOperations.data);

    return { listOperations, handleChange, filters, setFilters, columns };
};
