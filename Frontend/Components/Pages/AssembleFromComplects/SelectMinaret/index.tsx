import { TableApp } from '../../../Shared/Table';
import { eTypeButton } from '../useProps';
import { Wrapper } from './style';
import { iProps, useProps } from './useProps';

export const SelectComplectIyems = (props: iProps) => {
    const params = useProps(props);
    if (props.stateButton != eTypeButton.complectIyems) return null;

    return (
        <Wrapper>
            <TableApp
                rowSelection={params.rowSelection}
                columns={params.columns}
                dataSource={params.data}
                onChange={params.handleChange}
            />
        </Wrapper>
    );
};
