import { Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { Wrapper } from './style';

interface iTable<T> extends TableProps<T> {
    xScroll?: number;
}

export function TableApp<T extends object>(props: iTable<T>) {
    const [wrapperRef, setWrapperRef] = useState<HTMLElement>();
    const [y, setY] = useState<number | undefined>(undefined);

    useEffect(() => {
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
    }, [wrapperRef, props.dataSource]);

    return (
        <Wrapper
            ref={(ref) => {
                if (ref) setWrapperRef(ref);
            }}
        >
            <Table
                {...props}
                scroll={{ y, x: props.xScroll }}
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                    defaultPageSize: 100,
                }}
            />
        </Wrapper>
    );
}
