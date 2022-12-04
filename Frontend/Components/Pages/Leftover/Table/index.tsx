import { iData } from '../../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { contentDrawer } from '../../../Shared/contentDrawer';
import { MoveOutSolo } from './Components/MoveOut';
import { TableApp } from '../../../Shared/Table';
import { useColumns } from './useСolumns';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { columns, data } = useColumns(filters);

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
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            contentDrawer({
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
