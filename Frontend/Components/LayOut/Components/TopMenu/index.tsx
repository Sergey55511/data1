import { Avatar, Badge, Menu, Tooltip } from 'antd';
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
    BulbOutlined,
    MoreOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../Store/useStores';
import { ROUTES, tPages } from '../../../Pages/constants';
import { useRouter } from 'next/router';
import { MODALFLAGS } from '../../constants';
import { useState } from 'react';
import { Modals } from './Components/Modals';

export class IsShowModals {
    supportManagers = false;
}

export const TopMenu = observer(({ page }: { page: tPages }) => {
    const { loginStore, OperationStore } = useStores();
    const [isShowModals, setIsShowModals] = useState<IsShowModals>(new IsShowModals());
    const ordersCount = OperationStore.orders.length;
    const sharedCount = OperationStore.shared.length;

    const isSynchronousData = OperationStore.isSynchronousData;

    const router = useRouter();

    const onSelectHandler = (key: string) => {
        switch (key) {
            case MODALFLAGS.supportManagers:
                setIsShowModals((prev) => ({
                    ...prev,
                    supportManagers: true,
                }));
                // contentDrawer({ title: 'Рабочие:', content: <SupportManagers /> });
                break;
            default:
                router.push(key);
        }
    };

    return (
        <Wrapper>
            <Modals isShowModals={isShowModals} setIsShowModals={setIsShowModals} />
            <div className="menu">
                <Menu
                    mode="horizontal"
                    selectedKeys={[page]}
                    onSelect={(e) => onSelectHandler(e.key)}
                    items={[
                        {
                            label: 'Остатки',
                            key: ROUTES.root,
                            icon: <DatabaseOutlined />,
                        },
                        {
                            label: (
                                <Badge
                                    size="small"
                                    count={ordersCount}
                                    overflowCount={999}
                                >
                                    <>Задачи</>
                                </Badge>
                            ),
                            key: ROUTES.orders,
                            icon: <StarOutlined />,
                        },
                        {
                            label: (
                                <Badge
                                    size="small"
                                    count={sharedCount}
                                    overflowCount={999}
                                >
                                    <>Приход перемещение</>
                                </Badge>
                            ),
                            key: ROUTES.movein,
                            icon: <VerticalAlignBottomOutlined />,
                        },
                        {
                            label: 'Операции',
                            key: 'Operations',
                            icon: <MoreOutlined />,
                            children: [
                                {
                                    label: 'Приход сырья',
                                    key: ROUTES.newItem,
                                    icon: <ImportOutlined />,
                                },
                                {
                                    label: 'Отгрузка',
                                    key: ROUTES.moveout,
                                    icon: <ExportOutlined />,
                                },
                                {
                                    label: 'Перемещение',
                                    key: ROUTES.shareItems,
                                    icon: <CarOutlined />,
                                },
                                {
                                    label: 'Смешивание',
                                    key: 'mixingGroup',
                                    icon: <FullscreenExitOutlined />,
                                    children: [
                                        {
                                            label: 'Смешивание сорт',
                                            key: ROUTES.mixingGrade,
                                            icon: <FullscreenExitOutlined />,
                                        },
                                        {
                                            label: 'Смешивание размеров',
                                            key: ROUTES.mixingSize,
                                            icon: <FullscreenExitOutlined />,
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: 'Администрирование',
                            key: 'Administration',
                            icon: <SettingOutlined />,
                            children: [
                                {
                                    label: 'Рабочие',
                                    key: MODALFLAGS.supportManagers,
                                    icon: <TeamOutlined />,
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
            <div className="icon">
                <Tooltip
                    placement="bottom"
                    title={isSynchronousData ? 'Синхронизован' : 'Десинхронизован'}
                >
                    <Avatar
                        style={{
                            backgroundColor: isSynchronousData ? 'green' : 'orange',
                        }}
                        icon={<BulbOutlined />}
                    />
                </Tooltip>
            </div>
        </Wrapper>
    );
});
