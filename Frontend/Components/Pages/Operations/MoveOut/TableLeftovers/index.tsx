import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableApp } from '../../../../Shared/Table';
import { iDataIndex } from '../useProps';
import { useProps } from './useProps';

export const TableLeftOvers = observer(
    (props: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        leftovers: iDataIndex[];
        selectRow: (i: number) => void;
    }) => {
        const { columns, data, handleChange } = useProps(props);

        return (
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
            />
        );
    },
);
