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
    FileDoneOutlined,
    AuditOutlined,
} from '@ant-design/icons';
import { useStores } from '../../../../Store/useStores';
import { ROUTES } from '../../../Pages/constants';
import { MODALFLAGS } from '../../constants';
import { STORES } from '../../../../../Shared/constants';
import { ItemType, SubMenuType } from 'antd/lib/menu/hooks/useItems';

export const useItems = () => {
    const { loginStore, OperationStore } = useStores();
    const ordersCount = OperationStore.orders.length;
    const ordersGetOutCount = OperationStore.ordersGetOut.length;
    const sharedCount = OperationStore.shared.length;

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    let mixingChildrens = [
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
    ];

    if (!isMSC) {
        mixingChildrens = [
            ...mixingChildrens,
            {
                label: 'Смешивание сорт',
                key: ROUTES.mixingGrade,
                icon: <FullscreenExitOutlined />,
            },
            // {
            //     label: 'Смешивание размеров',
            //     key: ROUTES.mixingSize,
            //     icon: <FullscreenExitOutlined />,
            // },
            {
                label: 'Смешивание состояний',
                key: ROUTES.mixingState,
                icon: <FullscreenExitOutlined />,
            },
        ];
    }

    const leftoversChildren = [
        {
            label: 'Остатки',
            key: ROUTES.root,
            icon: <DatabaseOutlined />,
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
            label: 'Остатки изделий',
            key: 'leftoversElementsRoot',
            icon: <DatabaseOutlined />,
            children: [
                {
                    label: 'Остатки изделия',
                    key: ROUTES.products,
                    icon: <DatabaseOutlined />,
                },
                {
                    label: 'Остатки бижутерия',
                    key: ROUTES.bijouterie,
                    icon: <DatabaseOutlined />,
                },
            ],
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

    items.push({
        label: (
            <Badge size="small" count={ordersGetOutCount} overflowCount={999}>
                <>Выбытие</>
            </Badge>
        ),
        key: ROUTES.ordersGetOut,
        icon: <StarOutlined />,
    });

    if (isMSC) {
        items.push({
            label: 'Сборка',
            key: 'assembleRoot',
            icon: <DeploymentUnitOutlined />,
            children: [
                {
                    label: 'Сборка',
                    key: ROUTES.assemble,
                    icon: <DeploymentUnitOutlined />,
                },
                {
                    label: 'Комплектовка',
                    key: ROUTES.assembleComplects,
                    icon: <DeploymentUnitOutlined />,
                },
                {
                    label: 'Сборка бижутерия',
                    key: ROUTES.assembleBijouterie,
                    icon: <DeploymentUnitOutlined />,
                },
            ],
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

    const reportChildrens = [
        {
            label: 'Записи',
            key: ROUTES.reports.listOperations,
            icon: <UnorderedListOutlined />,
        },
        {
            label: 'Закупки',
            key: ROUTES.reports.moveInDocuments,
            icon: <UnorderedListOutlined />,
        },
    ];

    if (isMSC) {
        reportChildrens.push({
            label: 'Бланк',
            key: ROUTES.print.blank,
            icon: <AuditOutlined />,
        });
    }

    items.push({
        label: 'Отчеты',
        key: 'reports',
        icon: <FileDoneOutlined />,
        children: reportChildrens,
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
