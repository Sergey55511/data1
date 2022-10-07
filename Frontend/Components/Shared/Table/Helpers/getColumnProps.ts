import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getUniqueData } from './getUniqueData';
import { FilterValue } from 'antd/es/table/interface';

export const getColumnProps = (
    dataIndex: string,
    leftovers: iData[],
    filters: Record<string, FilterValue | null>,
) => {
    const key = dataIndex as keyof iData;

    return {
        dataIndex: key,
        filterSearch: true,
        filters: getUniqueData(leftovers, key),
        filteredValue: filters[dataIndex] || null,
        onFilter: (value: any, record: iData) => {
            return record[key] == value;
        },
    };
};
