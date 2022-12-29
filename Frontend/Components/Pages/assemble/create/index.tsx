import { FilterValue } from 'antd/es/table/interface';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { TableApp } from '../../../Shared/Table';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const AssembleCreate = observer(
    ({
        filters,
        setFilters,
        setSelectedRows,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        setSelectedRows: Dispatch<SetStateAction<iData[]>>;
    }) => {
        const { data, columns, handleChange } = useProps({
            filters,
            setFilters,
        });

        const rowSelection = {
            onChange: (selectedRowKeys: React.Key[], selectedRows: iData[]) => {
                setSelectedRows(selectedRows);
            },
            // getCheckboxProps: (record: iData) => ({
            //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
            //   name: record.name,
            // }),
        };

        return (
            <Wrapper>
                <TableApp
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    onChange={handleChange}
                />
            </Wrapper>
        );
    },
);
