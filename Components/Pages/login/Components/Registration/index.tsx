import { Button, Input } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useRef, useState } from 'react';
import { useStores } from '../../../../../Store/useStores';

export const Registration = () => {
    const submitRef = useRef<HTMLElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loginV, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loginStore } = useStores();

    const disabled = loginV && password && confirmPassword && password == confirmPassword;

    const onClickHandler = async () => {
        setIsLoading(true);
        await loginStore.registration({ login: loginV, password });
        setIsLoading(false);
    };

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == 'Enter') submitRef.current?.click();
    };

    return (
        <Wrapper onKeyPress={onKeyPressHandler}>
            <Input
                size="large"
                placeholder="Логин"
                prefix={<UserOutlined />}
                className="input"
                value={loginV}
                onChange={(e) => setLogin(e.target.value)}
            />
            <Input.Password
                size="large"
                placeholder="Пароль"
                prefix={<KeyOutlined />}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input.Password
                size="large"
                placeholder="Повторить пароль"
                prefix={<KeyOutlined />}
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                ref={submitRef}
                loading={isLoading}
                style={{ width: '100%' }}
                type="primary"
                disabled={!disabled}
                onClick={onClickHandler}
            >
                Создать
            </Button>
        </Wrapper>
    );
};
