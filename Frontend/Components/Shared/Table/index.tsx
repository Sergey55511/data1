import { Table, TableProps } from 'antd';
import { useLayoutEffect, useRef, useState } from 'react';
import { Wrapper } from './style';

export function TableApp<T extends object>(rest: TableProps<T>) {
    const [wrapperRef, setWrapperRef] = useState<HTMLElement>();
    // const [wrapperRef, setWrapperRef] = useState<HTMLElement>();
    const [y, setY] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        const getY = () => {
            if (!wrapperRef) return;
            const heightWrapper = wrapperRef.offsetHeight;
            const heightHeader =
                wrapperRef.querySelector<HTMLElement>('.ant-table-thead')?.offsetHeight ||
                0;
            const heightPagination =
                wrapperRef.querySelector<HTMLElement>('.ant-pagination')?.offsetHeight ||
                0;
            const marginPagination = 32;
            const height =
                heightWrapper - heightHeader - heightPagination - marginPagination;
            setY(height);
        };
        getY();
        window.addEventListener('resize', getY);
        return () => window.removeEventListener('resize', getY);
    }, [wrapperRef, rest.dataSource]);

    return (
        <Wrapper
            ref={(ref) => {
                if (ref) setWrapperRef(ref);
            }}
        >
            <Table
                {...rest}
                scroll={{ y }}
                pagination={{ showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100] }}
            />
        </Wrapper>
    );
}
