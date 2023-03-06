import { useQuery } from '@tanstack/react-query';
import { useStores } from '../../../../Store/useStores';
import { FilterValue } from 'antd/lib/table/interface';
import { useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { useColumns } from './useСolumns';
import moment from 'moment';
import { tValue } from '../../../Shared/InputNumber';
import * as api from '../../../../Store/OperationStore/Api';

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
    const [lot, setLot] = useState<tValue>();
    const getNumber = (v: any) => (v ? +v : undefined);

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const listMoveInDocuments = useQuery(
        ['listOperations', loginStore.user.storeId],
        () =>
            api.listMoveInDocument({
                start: filterDate.start!,
                end: filterDate.end!,
                lot: getNumber(lot),
            }),
        { enabled: !!loginStore.user.storeId },
    );
    const data = listMoveInDocuments.data?.map((item, index) => ({
        ...item,
        key: index,
        date: moment(item.date).format('DD.MM.YYYY'),
    }));
    const { columns } = useColumns(filters, data);

    return {
        listMoveInDocuments,
        handleChange,
        filters,
        setFilters,
        columns,
        filterDate,
        setFilterDate,
        data,
        lot,
        setLot,
    };
};
