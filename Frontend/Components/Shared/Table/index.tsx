import { Table, TableProps } from 'antd';
import { Wrapper } from './style';

export function TableApp<T extends object>(rest: TableProps<T>) {
    return (
        <Wrapper>
            <Table
                {...rest}
                pagination={{ showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }}
            />
        </Wrapper>
    );
}
