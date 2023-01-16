import { Button, Dropdown, Menu } from 'antd';
import { ExportOutlined, CarOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { iProps, useProps } from './useProps';
import { SelectUser } from './SelectUser';
import { SelectRecipient } from './SelectRecipient';

export const Actions = (props: iProps) => {
    const {
        reAssembleHandler,
        moveOutAssembleHandler,
        shareAssembleHandler,
        takeApartHandler,
        isShowSelectUser,
        setIsShowSelectUser,
        managerId,
        setManagerId,
        managers,
        isShowRecipient,
        setIsShowRecipient,
        recipients,
    } = useProps(props);

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: 'Разобрать',
                    icon: <DeploymentUnitOutlined />,
                    onClick: () => setIsShowSelectUser(true),
                },
                {
                    key: '2',
                    label: 'Отгрузить',
                    icon: <ExportOutlined />,
                    onClick: () => setIsShowRecipient(true),
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
        <>
            {isShowSelectUser && (
                <SelectUser
                    onCancel={() => setIsShowSelectUser(false)}
                    reAssembleHandler={reAssembleHandler}
                    isLoading={takeApartHandler.isLoading}
                    managerId={managerId}
                    setManagerId={setManagerId}
                    managers={managers}
                />
            )}
            {isShowRecipient && (
                <SelectRecipient
                    onCancel={() => setIsShowRecipient(false)}
                    submitHandler={reAssembleHandler}
                    isLoading={takeApartHandler.isLoading}
                    recipientId={managerId}
                    setRecipientId={setManagerId}
                    recipient={recipients}
                    isShowAddInput
                />
            )}
            <Dropdown overlay={menu} disabled={!props.selectedRows.length}>
                <Button>Действия</Button>
            </Dropdown>
        </>
    );
};
