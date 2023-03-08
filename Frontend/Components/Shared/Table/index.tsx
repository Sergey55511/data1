import { Table, TableProps } from 'antd';
import { useLayoutEffect, useRef, useState } from 'react';
import { Wrapper } from './style';

export function TableApp<T extends object>(rest: TableProps<T>) {
    const [wrapperRef, setWrapperRef] = useState<HTMLElement>();
    const [y, setY] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        console.log('hello');

        const getY = () => {
            if (!wrapperRef) return;
            const heightWrapper = wrapperRef.offsetHeight;
            const heightHeader =
                wrapperRef.querySelector<HTMLElement>('.ant-table-thead')?.offsetHeight ||
                0;
            const height = heightWrapper - heightHeader;
            setY(height);
        };
        getY();
        window.addEventListener('resize', getY);
        return () => window.removeEventListener('resize', getY);
    }, [wrapperRef]);

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
