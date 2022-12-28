import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction } from 'react';
import { TableApp } from '../../../Shared/Table';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const AssembleCreate = ({
    filters,
    setFilters,
}: {
    filters: Record<string, FilterValue | null>;
    setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
}) => {
    const { data, columns, handleChange } = useProps({
        filters,
        setFilters,
    });

    return (
        <Wrapper>
            <TableApp columns={columns} dataSource={data} onChange={handleChange} />
        </Wrapper>
    );
};
