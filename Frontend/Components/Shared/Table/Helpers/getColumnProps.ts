import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getUniqueData } from './getUniqueData';
import { FilterValue } from 'antd/es/table/interface';

export const getColumnProps = <T>(
    dataIndex: string,
    leftovers: T[],
    filters: Record<string, FilterValue | null>,
) => {
    const key = dataIndex as keyof T;

    return {
        dataIndex: key,
        filterSearch: true,
        filters: getUniqueData<T>(leftovers, key) as any,
        filteredValue: filters[dataIndex] || null,
        onFilter: (value: any, record: T) => {
            return record[key] == value;
        },
    };
};
