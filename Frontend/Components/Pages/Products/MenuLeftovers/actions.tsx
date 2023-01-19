import { Button, Dropdown, Menu } from 'antd';
import { ExportOutlined, CarOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { iProps, useProps } from './useProps';
import { SelectUser } from './SelectUser';
import { SelectRecipient } from './SelectRecipient';

export const Actions = (props: iProps) => {
    const params = useProps(props);

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: 'Разобрать',
                    icon: <DeploymentUnitOutlined />,
                    onClick: () => params.setIsShowSelectUser(true),
                },
                {
                    key: '2',
                    label: 'Отгрузить',
                    icon: <ExportOutlined />,
                    onClick: () => params.setTrueIsShowRecipient('recipientsOuter'),
                },
                {
                    key: '3',
                    label: 'Перемещение',
                    icon: <CarOutlined />,
                    onClick: () => params.setTrueIsShowRecipient('recipientsInternal'),
                },
            ]}
        />
    );

    return (
        <>
            {params.isShowSelectUser && (
                <SelectUser
                    onCancel={() => params.setIsShowSelectUser(false)}
                    reAssembleHandler={params.reAssembleHandler}
                    isLoading={params.takeApartHandler.isLoading}
                    managerId={params.managerId}
                    setManagerId={params.setManagerId}
                    managers={params.managers}
                    selectedRows={props.selectedRows}
                />
            )}
            {params.isShowRecipient && (
                <SelectRecipient
                    onCancel={() => params.setIsShowRecipient(false)}
                    submitHandler={params.moveOutAssembleHandler}
                    isLoading={params.postData.isLoading}
                    recipientId={params.recipientId}
                    setRecipientId={params.setRecipientId}
                    recipient={params.recipients}
                    selectedRows={props.selectedRows}
                    isShowAddInput={params.recipientType == 'recipientsOuter'}
                />
            )}
            <Dropdown overlay={menu} disabled={!props.selectedRows.length}>
                <Button>Действия</Button>
            </Dropdown>
        </>
    );
};
