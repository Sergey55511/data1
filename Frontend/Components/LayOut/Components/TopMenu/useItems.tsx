import { Badge } from 'antd';
import {
    DatabaseOutlined,
    VerticalAlignBottomOutlined,
    StarOutlined,
    ImportOutlined,
    SettingOutlined,
    ExportOutlined,
    CarOutlined,
    FullscreenExitOutlined,
    MoreOutlined,
    TeamOutlined,
    DeploymentUnitOutlined,
} from '@ant-design/icons';
import { useStores } from '../../../../Store/useStores';
import { ROUTES } from '../../../Pages/constants';
import { MODALFLAGS } from '../../constants';
import { STORES } from '../../../../../Shared/constants';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export const useItems = () => {
    const { loginStore, OperationStore } = useStores();
    const ordersCount = OperationStore.orders.length;
    const sharedCount = OperationStore.shared.length;

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    const mixingChildrens = isMSC
        ? [
              {
                  label: 'Смешивание партия',
                  key: ROUTES.mixingLot,
                  icon: <FullscreenExitOutlined />,
              },
          ]
        : [
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
          ];
    const items: ItemType[] = [
        {
            label: 'Остатки',
            key: ROUTES.root,
            icon: <DatabaseOutlined />,
        },
    ];

    if (isMSC) {
        items.push({
            label: 'Остатки изделия',
            key: ROUTES.products,
            icon: <DatabaseOutlined />,
        });
    }

    items.push({
        label: (
            <Badge size="small" count={ordersCount} overflowCount={999}>
                <>Задачи</>
            </Badge>
        ),
        key: ROUTES.orders,
        icon: <StarOutlined />,
    });

    if (isMSC) {
        items.push({
            label: 'Сборка',
            key: ROUTES.assemble,
            icon: <DeploymentUnitOutlined />,
        });
    }

    items.push({
        label: (
            <Badge size="small" count={sharedCount} overflowCount={999}>
                <>Приход перемещение</>
            </Badge>
        ),
        key: ROUTES.movein,
        icon: <VerticalAlignBottomOutlined />,
    });
    items.push({
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
                children: mixingChildrens,
            },
        ],
    });
    items.push({
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
    });

    return { items };
};
