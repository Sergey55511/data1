import { Avatar, Badge, Menu } from 'antd';
import {
    DatabaseOutlined,
    VerticalAlignBottomOutlined,
    StarOutlined,
    ImportOutlined,
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
                            label: <Link href="/newItem654">Приход перемещение</Link>,
                            key: pages.newItem+'asd',
                            icon: <VerticalAlignBottomOutlined />,
                        },
                        {
                            label: 'Операции',
                            key: 'Operations',
                            icon: <SettingOutlined />,
                            children: [
                                {
                                    label: <Link href="/newItem">Приход сырья</Link>,
                                    key: pages.newItem,
                                    icon: <ImportOutlined />,
                                },
                                {
                                    label: (
                                        <Link href="/operations/moveout">Отгрузка</Link>
                                    ),
                                    key: pages.moveOut,
                                    icon: <ExportOutlined />,
                                },
                                {
                                    label: (
                                        <Link href="/operations/shareItems">
                                            Перемещение
                                        </Link>
                                    ),
                                    key: pages.shareItems,
                                    icon: <CarOutlined />,
                                },
                                {
                                    label: (
                                        <Link href="/operations/mixing">Смешивание</Link>
                                    ),
                                    key: pages.mixing,
                                    icon: <FullscreenExitOutlined />,
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
