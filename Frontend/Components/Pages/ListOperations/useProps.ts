import { useQuery } from '@tanstack/react-query';
import { useStores } from '../../../Store/useStores';
import * as api from '../../../../Frontend/Store/OperationStore/Api';
import { FilterValue } from 'antd/lib/table/interface';
import { useState } from 'react';
import { iData } from '../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { useColumns } from './useСolumns';
import moment, { Moment } from 'moment';

export interface iFilterDate {
    start: moment.Moment | null;
    end: moment.Moment | null;
}

export const useProps = () => {
    const { loginStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [filterDate, setFilterDate] = useState<iFilterDate>({
        start: moment().subtract(31, 'days'),
        end: moment(),
    });

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
        () => api.listOperations({ start: filterDate.start!, end: filterDate.end! }),
        { enabled: !!loginStore.user.storeId },
    );

    const { columns } = useColumns(filters, listOperations.data);
    const data = listOperations.data?.map((item, index) => ({ ...item, key: index }));

    return {
        listOperations,
        handleChange,
        filters,
        setFilters,
        columns,
        filterDate,
        setFilterDate,
        data,
    };
};
