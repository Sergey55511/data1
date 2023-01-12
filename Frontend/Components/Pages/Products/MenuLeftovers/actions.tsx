import { Button, Dropdown, Menu } from 'antd';
import { ExportOutlined, CarOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';

export const Actions = ({ selectedRows }: { selectedRows: iDataProduct[] }) => {
    const reAssembleHandler = () => {
        const articles = selectedRows.map((item) => item.articleId);
        console.log('reAssemble', articles);
    };

    const moveOutAssembleHandler = () => {
        const articles = selectedRows.map((item) => item.articleId);
        console.log('moveOutAssemble', articles);
    };

    const shareAssembleHandler = () => {
        const articles = selectedRows.map((item) => item.articleId);
        console.log('shareAssemble', articles);
    };

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: 'Разобрать',
                    icon: <DeploymentUnitOutlined />,
                    onClick: reAssembleHandler,
                    disabled: true,
                },
                {
                    key: '2',
                    label: 'Отгрузить',
                    icon: <ExportOutlined />,
                    onClick: moveOutAssembleHandler,
                    disabled: true,
                },
                {
                    key: '3',
                    label: 'Перемещение',
                    icon: <CarOutlined />,
                    onClick: shareAssembleHandler,
                    disabled: true,
                },
            ]}
        />
    );

    return (
        <Dropdown overlay={menu} disabled={!selectedRows.length}>
            <Button>Действия</Button>
        </Dropdown>
    );
};
