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
                <TableApp
                    columns={params.columns}
                    dataSource={props.selectedRows}
                    onChange={params.handleChange}
                />
            </div>
        </Wrapper>
    );
};
