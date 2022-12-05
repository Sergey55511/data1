import type { ColumnsType, TableProps } from 'antd/es/table';
import { getColumnProps } from '../../../../Shared/Table/Helpers/getColumnProps';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableApp } from '../../../../Shared/Table';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import { InputNumber } from '../../../../Shared/InputNumber';
import { InputField } from '../../../../Shared/InputField';
import { Wrapper } from './style';
import { iDataIndex } from '../useProps';
import { useProps } from './useProps';

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
    }) => {
        const { columns, data, handleChange } = useProps(props);

        return (
            <Wrapper>
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
            </Wrapper>
        );
    },
);
