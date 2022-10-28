import type { ColumnsType, TableProps } from 'antd/es/table';
import { getColumnProps } from '../../../../Shared/Table/Helpers/getColumnProps';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableApp } from '../../../../Shared/Table';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import { iDataIndex } from '..';

export const TableLeftOvers = observer(
    ({
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

        const columns: ColumnsType<iDataIndex> = [
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
                title: KEYSLEFTOVERS.workpieceType.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
                title: KEYSLEFTOVERS.state.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
                title: KEYSLEFTOVERS.type.title,
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
                ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
                title: KEYSLEFTOVERS.sizeRange.title,
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

        const handleChange: TableProps<iDataIndex>['onChange'] = (
            _pagination,
            filters,
            _sorter,
        ) => {
            setFilters(filters);
            // setSortedInfo(sorter as SorterResult<DataType>);
        };

        return (
            <TableApp
                onRow={(record: iDataIndex, _rowIndex) => {
                    return {
                        onDoubleClick: (_event) => {
                            selectRow(record.index!);
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
