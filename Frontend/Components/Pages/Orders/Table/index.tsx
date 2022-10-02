import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../Store/useStores';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { useState } from 'react';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { TableApp } from '../../../Shared/Table';
import { MyDrawer } from '../../../Shared/MyDrawer';
import { useRouter } from 'next/router';

export const OrdersTable = observer(() => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const { OperationStore } = useStores();
    const data = OperationStore.orders.map((item, index) => ({ ...item, key: index }));
    const router = useRouter();

    const filteredleftovers = OperationStore.orders.filter((item) => {
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
        getColumnProps(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iData> = [
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.pp.key),
            title: KEYSLEFTOVERS.pp.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.user.key),
            title: KEYSLEFTOVERS.user.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.manager.key),
            title: KEYSLEFTOVERS.manager.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.operation.key),
            title: KEYSLEFTOVERS.operation.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
            title: KEYSLEFTOVERS.workpieceType.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
            title: KEYSLEFTOVERS.state.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.model.key),
            title: KEYSLEFTOVERS.model.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
            title: KEYSLEFTOVERS.sizeRange.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.materialGroup.key),
            title: KEYSLEFTOVERS.materialGroup.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
            title: KEYSLEFTOVERS.color.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.length.key),
            title: KEYSLEFTOVERS.length.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.channel.key),
            title: KEYSLEFTOVERS.channel.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
            title: KEYSLEFTOVERS.grade.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
            title: KEYSLEFTOVERS.state.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
            title: KEYSLEFTOVERS.lot.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
            title: 'В работе гр.',
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
            title: 'В работе шт.',
        },
    ];

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    return (
        <TableApp
            onRow={(record, _rowIndex) => {
                return {
                    onDoubleClick: (_event) => {
                        router.push(`/orders/getOrder/${record.pp}`);
                    },
                };
            }}
            columns={columns}
            dataSource={data}
            onChange={handleChange}
        />
    );
});
