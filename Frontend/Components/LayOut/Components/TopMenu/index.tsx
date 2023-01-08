import { Avatar, Menu, Tooltip } from 'antd';
import { UserOutlined, BulbOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../Store/useStores';
import { tPages } from '../../../Pages/constants';
import { useRouter } from 'next/router';
import { MODALFLAGS } from '../../constants';
import { useState } from 'react';
import { Modals } from './Components/Modals';
import { useItems } from './useItems';

export class IsShowModals {
    supportManagers = false;
}

export const TopMenu = observer(({ page }: { page: tPages }) => {
    const { loginStore, OperationStore } = useStores();
    const [isShowModals, setIsShowModals] = useState<IsShowModals>(new IsShowModals());

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

    const { items } = useItems();

    return (
        <Wrapper>
            <Modals isShowModals={isShowModals} setIsShowModals={setIsShowModals} />
            <div className="menu">
                <Menu
                    mode="horizontal"
                    selectedKeys={[page]}
                    onSelect={(e) => onSelectHandler(e.key)}
                    items={items}
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
