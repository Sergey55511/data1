import { Avatar, Badge, Menu } from 'antd';
import {
    DatabaseOutlined,
    VerticalAlignBottomOutlined,
    StarOutlined,
    FileOutlined,
    UserOutlined,
    SettingOutlined,
    ExportOutlined,
    CarOutlined,
    FullscreenExitOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../Store/useStores';
import { pages, tPages } from '../../../Pages/constants';

export const TopMenu = observer(({ page }: { page: tPages }) => {
    const { loginStore, ListsStore } = useStores();
    const ordersCount = ListsStore.orders.length;
    return (
        <Wrapper>
            <div className="menu">
                <Menu
                    mode="horizontal"
                    selectedKeys={[page]}
                    items={[
                        {
                            label: <Link href="/">Остатки</Link>,
                            key: pages.leftover,
                            icon: <DatabaseOutlined />,
                        },
                        {
                            label: (
                                <Badge
                                    size="small"
                                    count={ordersCount}
                                    overflowCount={999}
                                >
                                    <Link href="/orders">Задачи</Link>
                                </Badge>
                            ),
                            key: pages.orders,
                            icon: <StarOutlined />,
                        },
                        {
                            label: <Link href="/newItem">Приход сырья</Link>,
                            key: pages.newItem,
                            icon: <VerticalAlignBottomOutlined />,
                        },
                        {
                            label: 'Операции',
                            key: 'Operations',
                            icon: <SettingOutlined />,
                            children: [
                                {
                                    label: <Link href="/operations/moveout">Отгрузка</Link>,
                                    key: 'moveOutside',
                                    icon: <ExportOutlined />,
                                },
                                {
                                    label: <Link href="/newItem">Перемещение</Link>,
                                    key: 'moveInside',
                                    icon: <CarOutlined />,
                                },
                                {
                                    label: <Link href="/newItem">Спешивание</Link>,
                                    key: 'mix',
                                    icon: <FullscreenExitOutlined />,
                                },
                            ],
                        },
                        {
                            label: 'Отчеты',
                            key: 'Reports',
                            icon: <FileOutlined />,
                            children: [
                                {
                                    type: 'group',
                                    label: 'Item 1',
                                    children: [
                                        {
                                            label: 'Option 1',
                                            key: 'setting:12',
                                        },
                                        {
                                            label: 'Option 2',
                                            key: 'setting:22',
                                        },
                                    ],
                                },
                                {
                                    type: 'group',
                                    label: 'Item 2',
                                    children: [
                                        {
                                            label: 'Option 3',
                                            key: 'setting:32',
                                        },
                                        {
                                            label: 'Option 4',
                                            key: 'setting:42',
                                        },
                                    ],
                                },
                            ],
                        },
                    ]}
                />
            </div>
            <div className="store">
                Склад: <span>{loginStore.user?.store || ''}</span>
            </div>
            <div className="user">
                <Avatar icon={<UserOutlined />} />{' '}
                <span>
                    <Link href="/login">{loginStore.user?.login || ''}</Link>
                </span>
            </div>
        </Wrapper>
    );
});
