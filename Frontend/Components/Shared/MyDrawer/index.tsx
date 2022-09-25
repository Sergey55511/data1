import { Drawer, DrawerProps } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';

export type tNewValue = string | number | undefined;

type tProps = DrawerProps & {
    title: string;
    content: JSX.Element;
    onCancel?: () => void;
};

const DraverData = ({
    title,
    content,
    onCancel,
    placement = 'right',
    width = 500,
    height = '70%',
}: tProps) => {
    const cloneContent = React.cloneElement(content, { onClose: onCancel });
    return (
        <Drawer
            title={title}
            placement={placement}
            width={width}
            height={height}
            onClose={() => {
                if (onCancel) onCancel();
            }}
            visible={true}
        >
            {cloneContent}
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

    root.render(<DraverData {...rest} onCancel={onCancelHandler} />);
};
