import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../Store/useStores';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { useState } from 'react';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { TableApp } from '../../../Shared/Table';
import { useRouter } from 'next/router';
import { ROUTES } from '../../constants';
import { useColumns } from './useColumns';

export const useProps = () => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    const { columns } = useColumns(filters);

    const { OperationStore } = useStores();
    const data = OperationStore.orders.map((item, index) => ({ ...item, key: index }));
    const router = useRouter();

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    return { handleChange, router, data, columns };
};
