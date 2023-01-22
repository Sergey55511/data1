import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import { iDataIndex } from '../useProps';
import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction } from 'react';
import { getColumnProps } from '../../../../Shared/Table/Helpers/getColumnProps';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useStores } from '../../../../../Store/useStores';
import { STORES } from '../../../../../../Shared/constants';
import { useColumns } from '../useColumps';

export const useProps = ({
    filters,
    setFilters,
    leftovers,
    selectRow,
}: {
    filters: Record<string, FilterValue | null>;
    setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    leftovers: iDataIndex[];
    selectRow: (i: number) => void;
}) => {
    const data: iDataIndex[] = leftovers.map((item, index) => ({
        ...item,
        key: index,
    }));

    const columns: ColumnsType<iDataIndex> = useColumns({ filters, leftovers });

    const handleChange: TableProps<iDataIndex>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    return { columns, data, handleChange };
};
