import { Dispatch, SetStateAction } from 'react';
import { iLeftovers } from '../../../../Store/interfaces';
import { getUniqueData } from './getUniqueData';
import { FilterValue } from 'antd/es/table/interface';

export const getColumnProps = (
    dataIndex: string,
    leftovers: iLeftovers[],
    filters: Record<string, FilterValue | null>,
) => {
    const key = dataIndex as keyof iLeftovers;
    return {
        dataIndex: key,
        filterSearch: true,
        filters: getUniqueData(leftovers, key),
        filteredValue: filters[dataIndex] || null,
        onFilter: (value: any, record: iLeftovers) => {
            return record[key] == value;
        },
    };
};
