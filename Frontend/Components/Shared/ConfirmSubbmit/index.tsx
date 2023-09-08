import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm } = Modal;

export const confirmAction = ({
    title = 'Вы увеврены, подтвердить выгрузку?',
    icon = <ExclamationCircleOutlined />,
    content = 'Отменить выгрузку будет невозможно',
    subbmitHandler,
}: {
    title?: string;
    icon?: JSX.Element;
    content?: string;
    subbmitHandler: () => void | Promise<void>;
}) => {
    confirm({
        title,
        icon,
        content,
        onOk() {
            subbmitHandler();
        },
    });
};
