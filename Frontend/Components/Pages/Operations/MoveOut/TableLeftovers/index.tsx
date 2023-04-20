import { observer } from 'mobx-react-lite';
import { TableApp } from '../../../../Shared/Table';
import { iDataIndex } from '../UseProps';
import { useProps } from './useProps';
import { Counter } from '../../../../Shared/Counter';
import { iProps } from './useProps';

export const TableLeftOvers = observer((props: iProps) => {
    const { columns, data, handleChange, filteredleftovers, rowSelection } =
        useProps(props);

    return (
        <>
            <Counter data={filteredleftovers} countKey="count" widthKey="width" />
            <TableApp
                onRow={(record: iDataIndex, _rowIndex, ...rest) => {
                    return {
                        onDoubleClick: (_event) => {
                            props.selectRow(record.index!);
                        },
                    };
                }}
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                rowSelection={rowSelection}
            />
        </>
    );
});
