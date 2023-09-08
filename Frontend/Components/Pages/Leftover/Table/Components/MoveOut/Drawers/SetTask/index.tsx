import { Drawer } from 'antd';
import { Wrapper } from './style';
import { Models } from './Models';
import { Search } from './Search';
import { observer } from 'mobx-react-lite';
import { iProps, useProps } from './useProps';

export const SetTask = observer((props: iProps) => {
    const params = useProps(props);

    return (
        <Drawer open title="Назначить задание" onClose={props.onClose}>
            <Wrapper>
                {params.isShowSeartch && <Search {...params} />}
                <Models data={params.data} submitButton={params.submitButton} />
            </Wrapper>
        </Drawer>
    );
});
