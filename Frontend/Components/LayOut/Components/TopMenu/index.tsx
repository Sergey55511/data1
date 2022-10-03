import { Avatar, Menu } from 'antd';
import {
    DatabaseOutlined,
    VerticalAlignBottomOutlined,
    StarOutlined,
    FileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../Store/useStores';
import { useEffect } from 'react';
import { pages, tPages } from '../../../Pages/constants';

export const TopMenu = observer(({ page }: { page: tPages }) => {
    const { loginStore,ListsStore } = useStores();

    useEffect(() => {
        if (loginStore.user.storeId)
        ListsStore.getOperations(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

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
                            label: <Link href="/orders">Задачи</Link>,
                            key: pages.orders,
                            icon: <StarOutlined />,
                        },
                        {
                            label: <Link href="/newItem">Приход товара</Link>,
                            key: pages.newItem,
                            icon: <VerticalAlignBottomOutlined />,
                        },
                        // {
                        //     label: 'Операции',
                        //     key: 'SubMenu',
                        //     icon: <SettingOutlined />,
                        //     children: operations?.map((item, index) => ({
                        //         label: item.opereytion,
                        //         key: index,
                        //     })),
                        // },
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
