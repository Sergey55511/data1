import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableApp } from '../../../../Shared/Table';
import { iDataIndex } from '../UseProps';
import { useProps } from './useProps';
import { TableRowSelection } from 'antd/lib/table/interface';
import { Counter } from '../../../../Shared/Counter';

export const TableLeftOvers = observer(
    (props: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        leftovers: iDataIndex[];
        selectRow: (i: number) => void;
        rowSelection?: TableRowSelection<iDataIndex>;
    }) => {
        const { columns, data, handleChange, filteredleftovers } = useProps(props);

        return (
            <>
                <Counter data={filteredleftovers} />
                <TableApp
                    onRow={(record: iDataIndex, _rowIndex) => {
                        return {
                            onDoubleClick: (_event) => {
                                props.selectRow(record.index!);
                            },
                        };
                    }}
                    columns={columns}
                    dataSource={data}
                    onChange={handleChange}
                    rowSelection={props.rowSelection}
                />
            </>
        );
    },
);
