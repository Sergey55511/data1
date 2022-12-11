import { Drawer } from 'antd';
import { Wrapper } from './style';
import { Models } from './Models';
import { Search } from './Search';
import { observer } from 'mobx-react-lite';

export const SetTask = observer(({ onClose }: { onClose: () => void }) => {
    return (
        <Drawer open title="Назначить задание" onClose={onClose}>
            <Wrapper>
                <Search />
                <Models />
            </Wrapper>
        </Drawer>
    );
});
