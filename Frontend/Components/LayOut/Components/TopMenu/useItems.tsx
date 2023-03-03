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
    UnorderedListOutlined,
} from '@ant-design/icons';
import { useStores } from '../../../../Store/useStores';
import { ROUTES } from '../../../Pages/constants';
import { MODALFLAGS } from '../../constants';
import { STORES } from '../../../../../Shared/constants';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

export const useItems = () => {
    const { loginStore, OperationStore } = useStores();
    const ordersCount = OperationStore.orders.length;
    const ordersGetOutCount = OperationStore.ordersGetOut.length;
    const sharedCount = OperationStore.shared.length;

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    const mixingChildrens = isMSC
        ? [
              {
                  label: 'Смешивание партия',
                  key: ROUTES.mixingLot,
                  icon: <FullscreenExitOutlined />,
              },
              {
                  label: 'Смешивание производства',
                  key: ROUTES.mixingProduction,
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
            label: (
                <Badge size="small" count={ordersGetOutCount} overflowCount={999}>
                    <>Выбытие</>
                </Badge>
            ),
            key: ROUTES.ordersGetOut,
            icon: <StarOutlined />,
        });
    }

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
        label: 'Записи',
        key: ROUTES.listOperations,
        icon: <UnorderedListOutlined />,
    });

    const operationChildren = [];
    if (!isMSC) {
        operationChildren.push({
            label: 'Приход сырья',
            key: ROUTES.newItem,
            icon: <ImportOutlined />,
        });
        operationChildren.push({
            label: 'Приход заготовок',
            key: ROUTES.newItemBillets,
            icon: <ImportOutlined />,
        });
    }

    operationChildren.push({
        label: 'Отгрузка',
        key: ROUTES.moveout,
        icon: <ExportOutlined />,
    });
    operationChildren.push({
        label: 'Перемещение',
        key: ROUTES.shareItems,
        icon: <CarOutlined />,
    });
    operationChildren.push({
        label: 'Инвентаризация',
        key: ROUTES.inventory,
        icon: <DatabaseOutlined />,
    });
    operationChildren.push({
        label: 'Смешивание',
        key: 'mixingGroup',
        icon: <FullscreenExitOutlined />,
        children: mixingChildrens,
    });

    items.push({
        label: 'Операции',
        key: 'Operations',
        icon: <MoreOutlined />,
        children: operationChildren,
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
