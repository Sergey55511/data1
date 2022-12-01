import { Button, Input, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { iManager } from '../../../../../../../../../../../../Shared/Types/interfaces';
import { usePatchManager } from '../../../../../Hooks/usePatchManager';
import { Wrapper } from './style';

export const EditModal = ({
    onCancel,
    manager,
    fetchManagers,
}: {
    onCancel: () => void;
    manager: iManager;
    fetchManagers: () => void;
}) => {
    const [name, setName] = useState('');
    const subbmitButton = useRef<HTMLElement>(null);
    useEffect(() => setName(manager.name), []);

    const patchManager = usePatchManager(() => {
        onCancel();
        fetchManagers();
    });

    const subbmitHandler = () => {
        patchManager.mutate({ id: manager.id, params: { name } });
    };
    const onPressEnterHandler = () => {
        if (subbmitButton.current) subbmitButton.current.click();
    };

    return (
        <Modal
            title="Редактировать имя пользователя"
            open={true}
            onCancel={onCancel}
            footer={null}
        >
            <Wrapper>
                <div className="inputWrapper">
                    <Input
                        allowClear
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите имя сотрудника"
                        onPressEnter={onPressEnterHandler}
                    />
                </div>
                <div className="buttonWrapper">
                    <Button
                        ref={subbmitButton}
                        type="primary"
                        disabled={!name}
                        onClick={subbmitHandler}
                        loading={patchManager.isLoading}
                    >
                        Сохранить
                    </Button>
                    <Button onClick={onCancel}>Отмена</Button>
                </div>
            </Wrapper>
        </Modal>
    );
};
