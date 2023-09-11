import { TableApp } from '../../../Shared/Table';
import { Form } from './Form';
import { Wrapper } from './style';
import { iProps, useProps } from './useProps';

export const AssembleGet = (props: iProps) => {
    const params = useProps(props);

    return (
        <Wrapper>
            <Form {...props} />
            <div>
                <div className="title">Детализация</div>
            </div>
            <div style={{ flex: 1 }}>
                <TableApp
                    columns={params.columns}
                    dataSource={props.selectedRows}
                    onChange={params.handleChange}
                    rowSelection={params.rowSelection}
                />
            </div>
        </Wrapper>
    );
};
