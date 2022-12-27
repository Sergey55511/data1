import { Divider, Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { iProps } from '.';
import { Drawers } from './Drawers/drawers';
import { Form } from './form';
import { Record } from './record';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const MoveOutSolo = observer((props: iProps) => {
    const params = useProps(props);

    return (
        <Drawer open title="Выдать в работу" width={600} onClose={props.onClose}>
            <Wrapper>
                <Drawers {...{ record: props.record, props: params }} />
                <Form
                    {...{
                        props: params,
                        record: props.record,
                        isShowCount: props.isShowCount,
                        isShowTask: params.isShowTask,
                    }}
                />
                <Divider />
                <Record keys={params.keys} record={props.record} />
            </Wrapper>
        </Drawer>
    );
});
