import { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { iData, iShared } from '../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../Store/useStores';
import { getColumnProps } from '../../../../Shared/Table/Helpers/getColumnProps';
import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../constants';

export const useProps = () => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const { loginStore, OperationStore } = useStores();
    const router = useRouter();

    useEffect(() => {
        if (loginStore.user.storeId) OperationStore.getShared(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

    const handleChange: TableProps<iShared>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const data = OperationStore.shared.map((item, index) => ({
        ...item,
        date: moment(item.date).format('DD.MM.YYYY'),
        key: index,
    }));

    const filteredData = data.filter((item) => {
        for (const key in item) {
            const value: any = item[key as keyof typeof item];
            if (filters[key]?.length) {
                if (!filters[key]?.includes(value)) {
                    return false;
                }
            }
        }
        return true;
    });
    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps<iData>(dataIndex, filteredData, filters);

    const columns: ColumnsType<iShared> = [
        getColumnPropsHoc(KEYSLEFTOVERS.date.key),
        getColumnPropsHoc(KEYSLEFTOVERS.userLogin.key),
        getColumnPropsHoc(KEYSLEFTOVERS.store.key),
        getColumnPropsHoc(KEYSLEFTOVERS.numDocument.key),
    ];

    const onRowHandler = (record: iShared) => {
        return {
            onDoubleClick: () => {
                router.push(`${ROUTES.movein}/${encodeURI(record.numDocument)}`);
            },
        };
    };

    return { columns, filteredData, data, handleChange, onRowHandler };
};
