import { iData } from '../../../../../Shared/Types/interfaces';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { useStores } from '../../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { MyDrawer } from '../../../Shared/MyDrawer';
import { MoveOutSolo } from './Components/MoveOut';
import { TableApp } from '../../../Shared/Table';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { loginStore,ListsStore } = useStores();
        const { leftovers } = ListsStore;

        const data = leftovers.map((item, index) => ({ ...item, key: index }));

        const filteredleftovers = leftovers.filter((item) => {
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
                ...getColumnPropsHoc(KEYSLEFTOVERS.fraction.key),
                title: KEYSLEFTOVERS.fraction.title,
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
                ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
                title: KEYSLEFTOVERS.lot.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.productionId.key),
                title: KEYSLEFTOVERS.productionId.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
                title: KEYSLEFTOVERS.width.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
                title: KEYSLEFTOVERS.count.title,
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
                onRow={(record, rowIndex) => {
                    return {
                        onDoubleClick: (event) => {
                            MyDrawer({
                                title: 'Выдать в работу',
                                content: <MoveOutSolo record={record} />,
                            });
                        },
                    };
                }}
                columns={columns}
                dataSource={data}
                onChange={handleChange}
            />
        );
    },
);
