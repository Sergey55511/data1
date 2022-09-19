import { WarningOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Modal, notification } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Wrapper } from './style';

export type tNewValue = string | number | undefined;

type tProps = {
    title: string;
    content: JSX.Element;
    onCancel?: () => void;
};

const DraverData1 = ({ title, content, onCancel }: tProps) => {
    return (
        <Drawer
            title={title}
            placement="right"
            width={500}
            onClose={() => onCancel!()}
            visible={true}
        >
            {content}
        </Drawer>
    );
};

export const MyDrawer = ({ onCancel, ...rest }: tProps) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);
    const destroy = () => {
        root.unmount();
        div.remove();
    };

    const onCancelHandler = () => {
        if (onCancel) onCancel();
        destroy();
    };

    const onOkHandler = async (value: tNewValue) => {
        console.log('hello');

        destroy();
    };

    root.render(<DraverData1 {...rest} onCancel={onCancelHandler} />);
};
