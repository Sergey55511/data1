import { Button, Input, Select } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useEffect, useRef, useState } from 'react';
import { useStores } from '../../../../../Store/useStores';
import { observer } from 'mobx-react-lite';

const Option = Select.Option;
type tStatus = 'worker' | 'admin';
export const Registration = observer(() => {
    const submitRef = useRef<HTMLElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loginV, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<tStatus>('worker');
    const [store, setStore] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loginStore } = useStores();

    useEffect(() => {
        loginStore.getStores();
    }, []);

    const disabled = loginV && password && confirmPassword && password == confirmPassword;

    const onClickHandler = async () => {
        setIsLoading(true);
        await loginStore.registration({
            login: loginV,
            password,
            status,
            storeId: store + '',
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
            <Input.Password
                size="large"
                placeholder="Повторить пароль"
                prefix={<KeyOutlined />}
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Select
                size="large"
                defaultValue="worker"
                style={{ width: '100%' }}
                className="input"
                onChange={(v: tStatus) => setStatus(v)}
            >
                <Option value="worker">worker</Option>
                <Option value="admin">admin</Option>
            </Select>
            <Select
                size="large"
                defaultValue={1}
                style={{ width: '100%' }}
                className="input"
                onChange={(v) => setStore(v)}
            >
                {loginStore.stores.map((item) => (
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                ))}
            </Select>
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
});
