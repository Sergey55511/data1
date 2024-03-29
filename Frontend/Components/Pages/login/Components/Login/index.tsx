//Страница Логина на фронте

import { Button, Input } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../Store/useStores';
import { useRouter } from 'next/router';
import { ROUTES } from '../../../constants';

export default observer(() => {
    const submitRef = useRef<HTMLElement>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginV, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const disabled = loginV && password;
    const { loginStore } = useStores();
    const onClickHandler = async () => {
        setIsLoading(true);
        await loginStore.login({ login: loginV, password, storeId: 0 }, () => {
            router.push(ROUTES.root);
        });
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
            <Button
                ref={submitRef}
                loading={isLoading}
                style={{ width: '100%' }}
                type="primary"
                disabled={!disabled}
                onClick={onClickHandler}
            >
                Войти
            </Button>
        </Wrapper>
    );
});
