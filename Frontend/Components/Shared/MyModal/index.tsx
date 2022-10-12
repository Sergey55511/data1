import { Modal, ModalProps } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';

interface iProps {
    props?: ModalProps;
    children: JSX.Element;
}

const ModalData = ({ props, children }: iProps) => {
    return (
        <Modal open={true} footer={false} {...props}>
            {children}
        </Modal>
    );
};

export const myModal = ({ props, children }: iProps) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);

    const destroy = () => {
        root.unmount();
        div.remove();
    };

    const propsChildren = children.props;

    const onCancel: () => void = propsChildren.onCancel;

    const onCancelHandler = () => {
        if (onCancel) onCancel();
        destroy();
    };
    const cloneChildren = React.cloneElement(children, {
        ...propsChildren,
        onClose: onCancelHandler,
    });

    root.render(
        <ModalData props={{ ...props, onCancel: onCancelHandler }}>
            {cloneChildren}
        </ModalData>,
    );
};
