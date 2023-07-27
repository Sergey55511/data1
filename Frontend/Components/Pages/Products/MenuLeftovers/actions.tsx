import { Badge, Button, Dropdown, Menu } from 'antd';
import {
    ExportOutlined,
    CarOutlined,
    DeploymentUnitOutlined,
    PrinterOutlined,
} from '@ant-design/icons';
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
                    onClick: () => params.setRecipientType('takeApart'),
                },
                {
                    key: '2',
                    label: 'Отгрузить',
                    icon: <ExportOutlined />,
                    onClick: () => params.setRecipientType('recipientsOuter'),
                },
                {
                    key: '3',
                    label: 'Перемещение',
                    icon: <CarOutlined />,
                    onClick: () => params.setRecipientType('recipientsInternal'),
                },
                {
                    key: '4',
                    label: 'Распечатать',
                    icon: <PrinterOutlined />,
                    onClick: () => params.print(),
                },
            ]}
        />
    );

    return (
        <>
            {params.isShowSelectUser && (
                <SelectUser
                    onCancel={() => params.setRecipientType(undefined)}
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
                    onCancel={() => params.setRecipientType(undefined)}
                    submitHandler={params.moveOutAssembleHandler}
                    isLoading={params.postData.isLoading}
                    recipientId={params.recipientId}
                    setRecipientId={params.setRecipientId}
                    numDocument={params.numDocument}
                    setNumDocument={params.setNumDocument}
                    recipient={params.recipients}
                    selectedRows={props.selectedRows}
                    isShowAddInput={params.isShowAddInput}
                    isShowNumDocument={params.isShowNumDocument}
                />
            )}
            <Badge count={props.selectedRows.length}>
                <Dropdown overlay={menu} disabled={!props.selectedRows.length}>
                    <Button>Действия</Button>
                </Dropdown>
            </Badge>
        </>
    );
};
