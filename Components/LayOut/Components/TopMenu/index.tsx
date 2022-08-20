import { Menu } from 'antd';
import {
    DatabaseOutlined,
    AppstoreOutlined,
    SettingOutlined,
    FileOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Wrapper } from './style';

export const TopMenu = () => {
    return (
        <Wrapper>
            <div className="menu">
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['mail']}
                    items={[
                        {
                            label: <Link href="/leftover">Остатки</Link>,
                            key: 'mail',
                            icon: <DatabaseOutlined />,
                        },
                        {
                            label: 'Операции',
                            key: 'SubMenu',
                            icon: <SettingOutlined />,
                            children: [
                                {
                                    type: 'group',
                                    label: 'Item 1',
                                    children: [
                                        {
                                            label: 'Option 1',
                                            key: 'setting:1',
                                        },
                                        {
                                            label: 'Option 2',
                                            key: 'setting:2',
                                        },
                                    ],
                                },
                                {
                                    type: 'group',
                                    label: 'Item 2',
                                    children: [
                                        {
                                            label: 'Option 3',
                                            key: 'setting:3',
                                        },
                                        {
                                            label: 'Option 4',
                                            key: 'setting:4',
                                        },
                                    ],
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
                                            key: 'setting:1',
                                        },
                                        {
                                            label: 'Option 2',
                                            key: 'setting:2',
                                        },
                                    ],
                                },
                                {
                                    type: 'group',
                                    label: 'Item 2',
                                    children: [
                                        {
                                            label: 'Option 3',
                                            key: 'setting:3',
                                        },
                                        {
                                            label: 'Option 4',
                                            key: 'setting:4',
                                        },
                                    ],
                                },
                            ],
                        },
                    ]}
                />
            </div>
            <div className="store">
                Склад: <span>Москва</span>
            </div>
            <div className="user">
                Пользователь: <span>SSP</span>
            </div>
        </Wrapper>
    );
};
