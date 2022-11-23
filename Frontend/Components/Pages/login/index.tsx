//Страница Логина на фронте

import { MenuProps } from 'antd';
import { Wrapper } from './style';
import { useEffect, useState } from 'react';
import { useStores } from '../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { Menu } from 'antd';
import Login from './Components/Login';
import { Registration } from './Components/Registration';
import amber from './Images/amber.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
        setCurrent(e.key as typeof current);
    };
    useEffect(() => {
        ErrorStore.resetError();
        loginStore.whoami();
    }, []);

    const isAdmin = loginStore.user.status == 'admin';

    return (
        <Wrapper>
            <div className="formWrapper">
                <motion.div
                    className="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
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
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="stoneWrapper"
            >
                <Image layout="fill" objectFit="contain" src={amber.src} alt="amber" />
            </motion.div>
        </Wrapper>
    );
});
