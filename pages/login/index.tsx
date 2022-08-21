//Страница Логина на фронте

import { MenuProps } from 'antd';
import { Wrapper } from './style';
import { useEffect, useState } from 'react';
import { useStores } from '../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { Menu } from 'antd';
import Login from './Components/Login';
import { Registration } from './Components/Registration';

const items: MenuProps['items'] = [
    {
        label: 'Логин',
        key: 'login',
    },
    {
        label: 'Регистрация',
        key: 'registration',
    },
];

export default observer(() => {
    const [current, setCurrent] = useState<'login' | 'registration'>('login');
    const { loginStore, ErrorStore } = useStores();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key as typeof current);
    };
    useEffect(() => {
        ErrorStore.resetError();
        loginStore.whoami();
    }, []);

    const isAdmin = loginStore.user.status == 'admin';

    return (
        <Wrapper>
            <div className="form">
                {isAdmin && (
                    <div className="menu">
                        <Menu
                            onClick={onClick}
                            selectedKeys={[current]}
                            mode="horizontal"
                            items={items}
                        />
                    </div>
                )}
                {current == 'login' && <Login />}
                {current == 'registration' && <Registration />}
            </div>
        </Wrapper>
    );
});
