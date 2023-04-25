import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableApp } from '../../../../Shared/Table';
import { iDataIndex } from '../UseProps';
import { useProps } from './useProps';
import { Counter } from '../../../../Shared/Counter';

export const TableMoveOut = observer(
    (props: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        leftovers: iDataIndex[];
        removeRow: (i: number) => void;
        onChange: (
            record: iDataIndex,
            key: keyof iDataIndex,
            value: iDataIndex[keyof iDataIndex],
        ) => void;
        isInventory?: boolean;
    }) => {
        const { columns, data, handleChange, filteredleftovers } = useProps(props);

        return (
            <>
                <Counter data={filteredleftovers} countKey="count" widthKey="width" />
                <TableApp
                    onRow={(record: iDataIndex, _rowIndex) => {
                        return {
                            onDoubleClick: (_event) => {
                                props.removeRow(record.index!);
                            },
                        };
                    }}
                    columns={columns}
                    dataSource={data}
                    onChange={handleChange}
                />
            </>
        );
    },
);
