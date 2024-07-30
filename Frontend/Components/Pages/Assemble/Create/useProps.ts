import { useQuery } from '@tanstack/react-query';
import { TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { leftoversAssemble } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';
import { useColumns } from './useColumns';

export const useProps = ({
    filters,
    setFilters,
    stateId,
}: {
    filters: Record<string, FilterValue | null>;
    setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    stateId: number[];
}) => {
    const { loginStore, OperationStore } = useStores();

    const storeId = loginStore.user.storeId;

    const assembleLeftovers = useQuery(
        ['assembleLeftovers', storeId],
        () => leftoversAssemble(storeId, stateId),
        { enabled: !!storeId, onSuccess: () => OperationStore.getMaxId() },
    );
    const { columns } = useColumns({ data: assembleLeftovers.data, filters });

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const data = assembleLeftovers.data?.map((item, index) => ({ ...item, key: index }));

    return { columns, data, handleChange };
};
