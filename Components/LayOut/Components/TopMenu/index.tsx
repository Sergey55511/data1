import { Menu } from 'antd';
import {
    DatabaseOutlined,
    AppstoreOutlined,
    SettingOutlined,
    FileOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../Store/useStores';
import { useEffect } from 'react';

export const TopMenu = observer(() => {
    const { loginStore, OperationStore } = useStores();
    const { operations } = OperationStore;
    useEffect(() => {
        OperationStore.getOperations();
    }, []);

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
                            children: operations.map((item, index) => ({
                                label: item.opereytion,
                                key: index,
                            })),
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
                Склад: <span>{loginStore.user.store}</span>
            </div>
            <div className="user">
                Пользователь:{' '}
                <span>
                    <Link href="/login">{loginStore.user.login}</Link>
                </span>
            </div>
        </Wrapper>
    );
});
