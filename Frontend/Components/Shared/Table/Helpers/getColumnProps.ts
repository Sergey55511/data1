import { getUniqueData } from './getUniqueData';
import { FilterValue } from 'antd/es/table/interface';
import { KEYSLEFTOVERS } from '../constants';

export const getColumnProps = <T>(
    dataIndex: string,
    leftovers: T[],
    filters: Record<string, FilterValue | null>,
) => {
    const key = dataIndex as keyof T;
    const k = dataIndex as keyof typeof KEYSLEFTOVERS;

    return {
        title: KEYSLEFTOVERS[k]?.title,
        dataIndex: key,
        filterSearch: true,
        filters: getUniqueData<T>(leftovers, key) as any,
        filteredValue: filters[dataIndex] || null,
        onFilter: (value: any, record: T) => {
            return record[key] == value;
        },
    };
};
