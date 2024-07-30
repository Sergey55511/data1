import { observer } from 'mobx-react-lite';
import { TableApp } from '../../../Shared/Table';
import { eTypeButton } from '../useProps';
import { Wrapper } from './style';
import { iProps, useProps } from './useProps';

export const SelectComplect = observer((props: iProps) => {
    const params = useProps(props);
    if (props.stateButton != eTypeButton.complects) return null;

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
});
