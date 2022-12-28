import { iData } from '../../../../../Shared/Types/interfaces';
import { FilterValue } from 'antd/es/table/interface';

export const getFilteredleftovers = ({
    data,
    filters,
}: {
    data?: iData[];
    filters: Record<string, FilterValue | null>;
}) => {
    return (
        data?.filter((item) => {
            for (const key in item) {
                const value: any = item[key as keyof typeof item];
                if (filters[key]?.length) {
                    if (!filters[key]?.includes(value)) {
                        return false;
                    }
                }
            }
            return true;
        }) || []
    );
};
