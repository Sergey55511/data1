import { observer } from 'mobx-react-lite';
import { TableApp } from '../../../../Shared/Table';
import { Title } from '../../../../Shared/Title';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const MoveIn = observer(() => {
    const { columns, data, handleChange, onRowHandler } = useProps();

    return (
        <Wrapper>
            <Title text="Приход перемещение" />
            <TableApp
                onRow={onRowHandler}
                columns={columns}
                dataSource={data}
                onChange={handleChange}
            />
        </Wrapper>
    );
});
