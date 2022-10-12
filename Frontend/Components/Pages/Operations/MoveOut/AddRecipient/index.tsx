import { Button, Input } from 'antd';
import { useState } from 'react';
import { Title } from '../../../../Shared/Title';
import { ModalWrapper } from './style';

export const ModalContent = ({
    submit,
    onClose,
}: {
    submit: (v: string) => void;
    onClose?: () => void;
}) => {
    const [recipient, setRecipient] = useState('');
    return (
        <ModalWrapper>
            <Title text="Создать получателя" />
            <div className="inputWrapper">
                <Input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Введите получателя"
                    style={{ width: '100%' }}
                    allowClear
                />
            </div>
            <div>
                <Button
                    disabled={!recipient}
                    type="primary"
                    onClick={() => {
                        submit(recipient);
                        if (onClose) onClose();
                    }}
                >
                    Создать
                </Button>
            </div>
        </ModalWrapper>
    );
};
